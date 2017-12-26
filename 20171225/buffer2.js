let a = new Buffer('aaa');
let b = new Buffer('bbb');

let ab = Buffer.concat([a, b])

console.log(ab.toString())