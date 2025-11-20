const { connectDb, User, AuditLog } = require('../../lib/db');
module.exports = async (req, res) => {
  if(req.method!=='POST') return res.status(405).end();
  await connectDb();
  const { id, minutes } = req.body;
  const u = await User.findById(id);
  if(!u) return res.json({ok:false,message:'Not found'});
  u.mutedUntil = new Date(Date.now() + ((minutes||5)*60*1000));
  await u.save();
  await AuditLog.create({ actorId:null, action:'mute', targetId:u._id, details:`muted ${minutes} minutes`, createdAt:new Date() });
  res.json({ok:true});
};
