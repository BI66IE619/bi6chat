const { connectDb, User } = require('../../lib/db');
module.exports = async (req, res) => {
  await connectDb();
  const list = await User.find({status:'pending'}).select('username email createdAt');
  res.json(list);
};
