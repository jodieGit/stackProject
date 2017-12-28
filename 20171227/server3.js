const http = require('http');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');

http.createServer((req, res)=>{
  let {pathname, query} = url.parse(req.url, true);
  // 如果不设置该头，则会直接下载文件，而不是打开
  res.setHeader('Content-Encoding', 'gzip');
  let rs = fs.createReadStream(`www${pathname}`);
  let gzip = zlib.createGzip();
  rs.pipe(gzip).pipe(res);

  rs.on('error', function () {
    res.writeHead(404);
    res.write('not found');
    res.end();
  })
}).listen(8080)