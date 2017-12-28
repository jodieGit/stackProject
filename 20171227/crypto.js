const crypto = require('crypto');

let hash = crypto.createHash('md5');

hash.update('abc');
hash.update('dsd');

console.log(hash.digest('hex'));