const { connectDb, ChatMessage } = require('../../lib/db');
module.exports = async (req, res) => {
  await connectDb();
  const list = await ChatMessage.find({}).sort({createdAt:-1}).limit(100).lean();
  res.json(list.reverse());
};
