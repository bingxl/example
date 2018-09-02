const http = require('http');
const {readFile} = require('./read-file');
const {getIp} = require('./util');

const port = 8080;
const server = http.createServer();
server.on('request', (req, res) => {
  console.log(getIp(req));
  if (/\.png$/.test(req.url)) {
    const content = readFile('img.png');
    console.log('content length is:', content.byteLength);
    res.writeHead(200, {
      'Content-Length': content.byteLength,
      'Content-Type': 'image/png',
    });
    res.write(content);
    res.end();
    return;
  }
  if (req.url === '/index.html') {
    console.log('request index.html');
    const content = readFile('index.html');
    console.log('content is ', content);
    res.writeHead(200, {
      'Content-Length': content.byteLength,
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*',
    });
    res.write(content);
    res.end();
  } else if (req.url === '/api') {
    let buffer = Buffer.from('');
    req.on('data', chunk => {
      console.log('get chunk: ', chunk);
      buffer = Buffer.concat([buffer, chunk]);
    });
    req.on('end', () => {
      res.writeHead(200, {
        'Content-type': 'text/text',
      });
      res.write(JSON.stringify({
        name: 'bingxl',
        age: 22,
        data: buffer.toString(),
      }));
      res.end();
    })
    
  } else {
    res.end('bad request');
  }

});

server.listen(port, '127.0.0.1');

server.on('listening', () => {
  console.log('server has listen in ', port);
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`port ${port} has been used`);
  } else {
    console.log('err message: ', e);
  }
});

function close() {
  if (server.listening) {
    server.close();
  }
}
