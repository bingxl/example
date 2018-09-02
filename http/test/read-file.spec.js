const {readFile} = require('../server/read-file');

const content = readFile('index.html');

console.log('content is ', content);