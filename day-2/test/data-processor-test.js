const dataProcessor = require('../data-processor.js');

let obj = dataProcessor.parseLine('1-3 a: abcde');
console.log(obj);


let list = ['1-2 x: xpxc', '1-5 b: bwlbbbbcq'];
console.log(dataProcessor.mapData(list));

