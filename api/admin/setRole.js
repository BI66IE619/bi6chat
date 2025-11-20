const { connectDb, User, AuditLog } = require('../../lib/db');
module.exports = async (req, res) => {
  if(req.method!=='POST') return res.status(405).end();
  await connectDb();
  const { id, role } = req.body;
  const u = await User.findById(id);
  if(!u) return res.json({ok:false,message:'Not found'});
  u.role = role; await u.save();
  await AuditLog.create({ actorId:null, action:'setRole', targetId:u._id, details:`set role ${role}`, createdAt:new Date() });
  res.json({ok:true});
};
