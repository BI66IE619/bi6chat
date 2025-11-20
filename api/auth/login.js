const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { connectDb, User } = require('../../lib/db');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
module.exports = async (req, res) => {
  if(req.method !== 'POST') return res.status(405).end();
  await connectDb();
  const { username, password, remember } = req.body;
  const user = await User.findOne({username});
  if(!user) return res.json({ok:false,message:'No such user'});
  if(user.status !== 'approved') return res.json({ok:false,message:'Account not approved or banned'});
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.json({ok:false,message:'Invalid password'});
  const token = jwt.sign({id:user._id,role:user.role,username:user.username}, JWT_SECRET, { expiresIn: remember? '30d':'8h' });
  // return token in body (client may store it) and set cookie
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${remember?2592000:28800}`);
  res.json({ok:true,token,username:user.username});
};
