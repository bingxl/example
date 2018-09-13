const fs = require('fs');
const http = require('http');
const hostname = 'fm.shiyunjj.com'; // 主站 m.mmjpg.com
const path = 'large/2018/1460.jpg';
let options = {
  port: 80,
  hostname,
  method: 'GET',
  path,
  headers: {
    "Referer": "http://m.mmjpg.com/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"

  }
};

const request = http.request(options, (res) => {``
  console.log('STATUS: ', res.statusCode);
  console.log('HEADERS: ', JSON.stringify(res.headers));
  res.pipe(fs.WriteStream(__dirname + '/test.jpg'));
  // res.setEncoding('utf8'); // 设置了encoding 后data事件的回调函数参数变成字符串
  // const stream = fs.createWriteStream('./test.png');
  // let buffer = Buffer.from('');
  res.on('data', (chunk) => {
    // stream.write(chunk);
  }).on('end', () => {
    // console.log(buffer.toString('base64'));
    console.log('接受数据完毕');
  });
});
console.log(request.headers);
request.end();
