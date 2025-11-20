const keywords = require('../config/moderationKeywords.json');
module.exports = {
  checkKeywords: (text)=> keywords.find(k=> text.toLowerCase().includes(k))
};
