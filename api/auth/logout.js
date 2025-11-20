module.exports = async (req, res) => {
  res.setHeader('Set-Cookie','token=; HttpOnly; Path=/; Max-Age=0');
  res.json({ok:true});
};
