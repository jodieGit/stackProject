let http =  require('http');
let queryString = require('queryString');
let url = require('url');

let server = http.createServer((req, res) => {
  // Get请求
  let {pathName, query} = url.parse(req.url, true)
  console.log('Get请求数据', pathName, query)

  // POST请求
  let aBuffer = [];
  req.on('data', data => {
    aBuffer.push(data);
  });
  req.on('end', () => {
    let data = Buffer.concat(aBuffer);
    const post =  queryString.parse(data.toString())
  })
})
server.listen(8080)