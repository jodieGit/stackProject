import { Buffer } from 'buffer';

const http = require('http');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');
const router = require('./lib/route');

let server = http.createServer((req, res) => {
  let {pathname, query} = url.parse(req.url, true);

  res.send = function(data) {
    if(!(data instanceof Buffer) && typeof(data)!= 'string') {
      data = JSON.stringify(data);
    }
    res.write(data);
  }
  if(false == router.emit(pathname, req, res)) {
    let rs = fs.createReadStream(`www${pathname}`);
    let gz = zlib.createGzip();
    res.setHeader('Content-Encoding', 'gzip')
    rs.pipe(gz).pipe(res)
    rs.on('error', (err) => {
      res.writeHead(404);
      res.write('not found');
      res.end();
    })
  }
}).listen(8080)
