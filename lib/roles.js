module.exports = {
  isAdmin: user => user && user.role==='admin',
  isMod: user => user && (user.role==='moderator' || user.role==='admin')
};
