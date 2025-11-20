const { connectDb, User, AuditLog } = require('../../lib/db');
module.exports = async (req, res) => {
  if(req.method!=='POST') return res.status(405).end();
  await connectDb();
  const { id, reason } = req.body;
  const u = await User.findById(id);
  if(!u) return res.json({ok:false,message:'Not found'});
  u.status='banned'; await u.save();
  await AuditLog.create({ actorId:null, action:'ban', targetId:u._id, details:reason||'no-reason', createdAt:new Date() });
  res.json({ok:true});
};
