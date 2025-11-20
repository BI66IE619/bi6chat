const jwt = require('jsonwebtoken');
const { connectDb, User } = require('../../lib/db');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
module.exports = async (req, res) => {
  await connectDb();
  const token = (req.cookies && req.cookies.token) || req.headers.authorization && req.headers.authorization.split(' ')[1];
  if(!token) return res.json({});
  try{
    const p = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(p.id).select('-passwordHash');
    if(!user) return res.json({});
    res.json({username:user.username,role:user.role,status:user.status,mutedUntil:user.mutedUntil});
  }catch(e){ res.json({}); }
};
