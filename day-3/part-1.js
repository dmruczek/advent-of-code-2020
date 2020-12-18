const Map = require('./map.js');

var map = new Map();
map.logMap();
map.goSledding(3, 1);
map.logMap();

console.log('Trees Hit: ' + map.getTreesHit());