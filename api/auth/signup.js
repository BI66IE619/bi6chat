const bcrypt = require('bcryptjs');
const { connectDb, User } = require('../../lib/db');
module.exports = async (req, res) => {
  if(req.method !== 'POST') return res.status(405).end();
  await connectDb();
  const { username, password, email } = req.body;
  if(!username || !password) return res.json({ok:false,message:'username & password required'});
  const exists = await User.findOne({username});
  if(exists) return res.json({ok:false,message:'username taken'});
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, email: email||null, passwordHash: hash, role:'user', status:'pending', reputation:0, createdAt:new Date() });
  await user.save();
  res.json({ok:true,message:'Account created and pending approval'});
};
