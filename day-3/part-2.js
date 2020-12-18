const Map = require('./map.js');

let map = new Map();
map.goSledding(1, 1);
const one = map.getTreesHit();
console.log('1, 1  -  Trees Hit: ' + map.getTreesHit());

map = new Map();
map.goSledding(3, 1);
const two = map.getTreesHit();
console.log('3, 1  -  Trees Hit: ' + map.getTreesHit());

map = new Map();
map.goSledding(5, 1);
const three = map.getTreesHit();
console.log('5, 1  -  Trees Hit: ' + map.getTreesHit());

map = new Map();
map.goSledding(7, 1);
const four = map.getTreesHit();
console.log('7, 1  -  Trees Hit: ' + map.getTreesHit());

map = new Map();
map.goSledding(1, 2);
const five = map.getTreesHit();
console.log('1, 2  -  Trees Hit: ' + map.getTreesHit());

const answer = one * two * three * four * five;

console.log('Answer:  ', answer);