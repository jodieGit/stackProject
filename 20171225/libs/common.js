Buffer.prototype.split = Buffer.prototype.split || function(str) {
    let b1 = this;
    let result = [];
    let n ;
    
    while((n=b1.indexOf(str))!=-1) {
        let part1 = b1.slice(0, n);
        let part2 = b1.slice(n+str.length);
        result.push(part1);
        b1 = part2;
    }
    result.push(b1)
    return result;
    // console.log(result.map(item=>item.toString()))
}

exports.parseInfo = function (str) {
  let arr = str.split('; ');
  let arr2 = [];
  arr.forEach((item)=> {
    let a = item.split('\r\n');
    arr2 = arr2.concat(a)
  })

  let json = {};
  arr2.forEach((item)=> {
    let [key, val] = item.split('=')
    if(!val) {
      json[key] = val;
    } else {
      // 去除两边的括号
      json[key] = val.substring(1, val.length-1)
    }
  })
  return json;
}