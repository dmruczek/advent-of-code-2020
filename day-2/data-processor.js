

var getRawLines = function() {
    const fs = require('fs');
    let data = fs.readFileSync('input.txt', 'utf-8');    
    let lines = data.split('\n');
    return lines;
}

var parseLine = function(line) {
    let re = /(\d+)-(\d+) (\w): (\w+)/;
    let matches = line.match(re);
    return {
        from: parseInt(matches[1]),
        to: parseInt(matches[2]),
        char: matches[3],
        password: matches[4],
        original: line
    };
}

var mapData = function(lines) {
    return lines.map(line => parseLine(line));
}

var getData = function() {
    let lines = getRawLines();
    return mapData(lines);
}



module.exports= {getData, parseLine, getRawLines, mapData}