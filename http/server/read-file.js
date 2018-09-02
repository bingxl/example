const fs = require('fs');
const path = require('path');

function readFile(key) {
  const url = path.join(__dirname, `../client/${key}`);
  return fs.readFileSync(url);
}
module.exports = {
  readFile,
};
