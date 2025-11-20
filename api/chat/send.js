const jwt = require('jsonwebtoken');
const { connectDb, ChatMessage, User, AuditLog } = require('../../lib/db');
const keywords = require('../../config/moderationKeywords.json');
const SCALED_RONE_API_KEY = process.env.SCALED_RONE_API_KEY || '';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
module.exports = async (req, res) => {
  if(req.method!=='POST') return res.status(405).end();
  await connectDb();
  const token = (req.cookies && req.cookies.token) || req.headers.authorization && req.headers.authorization.split(' ')[1];
  if(!token) return res.json({ok:false,message:'not authenticated'});
  try{
    const p = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(p.id);
    if(!user) return res.json({ok:false,message:'user not found'});
    if(user.status!=='approved') return res.json({ok:false,message:'not approved'});
    if(user.mutedUntil && new Date(user.mutedUntil) > new Date()) return res.status(403).json({ok:false,message:'muted'});
    const { text, channel } = req.body;
    if(!text || text.trim().length===0) return res.json({ok:false,message:'empty message'});
    const lower = text.toLowerCase();
    const found = keywords.find(k=> lower.includes(k));
    let moderated=false, reason=null, storedText=text;
    if(found){ moderated=true; storedText='[removed]'; reason=`keyword:${found}`; await AuditLog.create({actorId:user._id, action:'moderate', targetId:user._id, details:reason, createdAt:new Date()}); }
    const msg = await ChatMessage.create({ userId:user._id, username:user.username, text:storedText, moderated, reason, channel:channel||'observable-room', createdAt:new Date()});
    // Optionally publish to Scaledrone server-side (simple fetch):
    try{
      if(process.env.SCALED_RONE_API_KEY){
        const fetch = require('node-fetch');
        const body = { room: msg.channel, data: { id: msg._id.toString(), username: msg.username, text: msg.text, moderated: msg.moderated, createdAt: msg.createdAt } };
        await fetch(`https://api.scaledrone.com/v3/${process.env.SCALED_RONE_API_KEY}/publish`, { method:'POST', body: JSON.stringify(body), headers:{ 'Content-Type':'application/json' } });
      }
    }catch(e){ console.error('scaledrone publish failed',e.message); }
    res.json({ok:true, message: moderated? 'Message moderated':'Message sent', msg});
  }catch(e){ console.error(e); res.json({ok:false,message:'auth error'}); }
};
