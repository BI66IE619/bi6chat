const { connectDb, User, AuditLog } = require('../../lib/db');
module.exports = async (req, res) => {
  if(req.method!=='POST') return res.status(405).end();
  await connectDb();
  const { id } = req.body;
  const u = await User.findById(id);
  if(!u) return res.json({ok:false,message:'Not found'});
  u.mutedUntil = null; await u.save();
  await AuditLog.create({ actorId:null, action:'unmute', targetId:u._id, details:'unmuted via api', createdAt:new Date() });
  res.json({ok:true});
};
