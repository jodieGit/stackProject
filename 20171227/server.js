const http = require('http');
const url = require('url');
const fs = require('fs');

let server = http.createServer((req, res) => {
  let {pathname, query} = url.parse(req.url, true);
  console.log(`www${pathname}`)
  fs.readFile(`www${pathname}`, (err, data)=> {
    if(err) {
      res.writeHead(404);
      res.write('not found');
    } else {
      res.writeHead(200);
      res.write(data)
    }
    res.end();
  })
}).listen(8080)