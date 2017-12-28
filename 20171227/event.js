const Event = require('events').EventEmitter;
let ev = new Event();

ev.on('jodie', (a,b,c,d) => {
  console.log('事件1', a, b, c, d);
})

ev.on('jodie', (a,b,c,d) => {
  console.log('事件2', a, b, c, d);
})

let res = ev.emit('jodie', 1, 2, 3, 4);
console.log('emit', res)
