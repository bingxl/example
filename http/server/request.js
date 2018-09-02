const fs = require('fs');
const http = require('http');
const hostname = 'dev.wemiracle.com';
const path = '/Uploads/WxaQrcode/1535526274.png';
let options = {
  port: 80,
  hostname,
  method: 'GET',
  path
};

const request = http.request(options, (res) => {
  console.log('STATUS: ', res.statusCode);
  console.log('HEADERS: ', JSON.stringify(res.headers));
  res.setEncoding('utf8'); // 设置了encoding 后data事件的回调函数参数变成字符串
  // const stream = fs.createWriteStream('./test.png');
  let buffer = Buffer.from('');
  res.on('data', (chunk) => {
    // stream.write(chunk);
    buffer = Buffer.concat([buffer, Buffer.from(chunk)]);
  }).on('end', () => {
    fs.writeFileSync('./test.txt', buffer.toString('base64'));
    // console.log(buffer.toString('base64'));
    console.log('接受数据完毕');
  });
});
request.end();
