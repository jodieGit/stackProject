const fs = require('fs');
const zlib = require('zlib');

let rs = fs.createReadStream('www/1.html');
let ws = fs.createWriteStream('www/2.html');

let rs1 = fs.createReadStream('www/1.jpg');
let ws1 = fs.createWriteStream('www/2.jpg.gz')


let gz = zlib.createGzip();
rs.pipe(gz).pipe(ws)
rs1.pipe(gz).pipe(ws1);

rs.on('error', (err)=> {
  console.log('文件读取失败');
})

// 疑问1： rs.finish无效原因
rs.on('finish', () => {
  console.log('文件读取成功');
})

ws.on('error', (err) => {
  console.log('文件写入失败');
})

ws.on('finish', () => {
  console.log('文件写入成功');
})

rs1.on('error', (err) => {
  if(err) {
    console.log('文件读入失败')
  }
})

ws1.on('error', (err) => {
  console.log('写入文件失败')
})

ws1.on('finish', () => {
  console.log('成功写入文件')
})