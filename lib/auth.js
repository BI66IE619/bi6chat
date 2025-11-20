// helper to extract token and verify
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
module.exports = {
  verifyToken: (token)=> jwt.verify(token, JWT_SECRET)
};
