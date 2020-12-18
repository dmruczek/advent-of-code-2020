'use strict';

module.exports = class Map {
    constructor(useTestData) {
        this.initialize(useTestData);
        this.personX = 0;
        this.personY = 0;
        this.treesHit = 0;
    }

    parseData(filename) {
        const fs = require('fs');
        let data = fs.readFileSync(filename, 'utf-8');    
        this.mapData = data.split('\r\n');
    }

    initialize(useTestData) {
        if (useTestData) {
            this.parseData('test-input.txt');
        } else {
            this.parseData('input.txt');
        }
    }

    logMap() {
        for (let i = 0; i < this.mapData.length; i++) {
            console.log(this.mapData[i]);
        }
    }

    markCurrentLocation(charToMark) {
        let chars = this.mapData[this.personY].split('');
        chars[this.personX] = charToMark;
        this.mapData[this.personY] = chars.join('');
    }

    sledTo(x,y) {
        let newX = this.personX + x;
        if (newX >= this.mapData[0].length) {
            newX = newX - this.mapData[0].length;
        }
        let newY = this.personY + y;
        this.personX = newX;
        this.personY = newY;

        if (this.mapData[this.personY].charAt(this.personX) === '#') {
            this.markCurrentLocation('X');
            this.treesHit++;
        } else {
            this.markCurrentLocation('O');
        }
    }

    getTreesHit() {
        return this.treesHit;
    }


    goSledding(angleRight, angleDown) {
        while (this.personY < (this.mapData.length - 1)) {
            // console.log('sledding from (', this.personX, ', ', this.personY, ').');
            this.sledTo(angleRight, angleDown);
        }
    }

}

