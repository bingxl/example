const fs = require('fs');

class WebSocket {
  constructor(options) {

  }
}

function log(...args) {
  args.forEach(arg => {
    fs.writeFileSync('./log.json', JSON.stringify(arg));
  })
}

function getIp(req) {
  return req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null);
}
module.exports = {
  log,
  getIp,
}