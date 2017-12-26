const url = require('url');
const querystring = require('querystring');
const http = require('http');

let server = http.createServer((req, res) => {
  // Get数据
  let {pathname, query} = url.parse(req.url, true)

  console.log('接受到了GET数据：', pathname, query);

  // Post 数据
  let aBuffer = [];
  req.on('data', data => {
    aBuffer.push(data)
  });
  req.on('end', () => {
    const post=querystring.parse(data.toString());
    
    console.log('POST数据：', post);
  })
});
server.listen(8080)