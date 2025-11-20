const fetch = require('node-fetch');
module.exports = async (req, res) => {
  if(req.method!=='POST') return res.status(405).end();
  if(!process.env.SCALED_RONE_API_KEY) return res.status(400).json({ok:false,message:'no scaledrone key'});
  await fetch(`https://api.scaledrone.com/v3/${process.env.SCALED_RONE_API_KEY}/publish`, { method:'POST', body: JSON.stringify(req.body), headers:{'content-type':'application/json'} });
  res.json({ok:true});
};
