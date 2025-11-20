const { connectDb, User, AuditLog } = require('../../lib/db');
module.exports = async (req, res) => {
  if(req.method!=='POST') return res.status(405).end();
  await connectDb();
  const { id } = req.body;
  const u = await User.findById(id);
  if(!u) return res.json({ok:false,message:'Not found'});
  u.status='banned'; await u.save();
  await AuditLog.create({ actorId:null, action:'deny', targetId:u._id, details:'denied via api', createdAt:new Date() });
  res.json({ok:true});
};
