Buffer.prototype.split = Buffer.prototype.split || function(str) {
    let b1 = this;
    let result = [];
    let n ;
    
    while((n=b1.indexOf(str))!=-1) {
        let part1 = b1.slice(0, n);
        let part2 = b1.slice(n+2);
        result.push(part1);
        b1 = part2;
    }
    result.push(b1)
    
    console.log(result.map(item=>item.toString()))
}