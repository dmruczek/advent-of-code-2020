'use strict';

module.exports = class BoardingPassDecoder {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.parseData('input.txt');
    }

    parseData(filename) {
        const path = require('path');
        const fs = require('fs');
        
        let data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        this.rawBoardingPasses = data.split('\r\n');
    }

    narrowLocation(location, direction) {
        let remainingSpace = location.max - location.min + 1;
        let half = remainingSpace / 2;
        if (direction === 'F' || direction === 'L') {
            // lower half
            location.max -= half;
        } else if (direction === 'B' || direction === 'R') {
            // upper half
            location.min += half;
        } else {
            throw "Invalid direction: " + direction;
        }
        return location;
    }

    computeSeatId(row, column) {
        return (row * 8) + column;
    }

    decodeBoardingPass(boardingPass) {
        const rowPortion = boardingPass.substr(0,7);
        const columnPortion = boardingPass.substr(7,3);
        let rowLocation = {min:0, max:127};
        let columnLocation = {min:0, max:7};

        for (let i = 0; i < rowPortion.length; i++) {
            this.narrowLocation(rowLocation, rowPortion[i]);
        }

        for (let i = 0; i < columnPortion.length; i++) {
            this.narrowLocation(columnLocation, columnPortion[i]);
        }
        // min and max should now be equal.

        return { 
            row: rowLocation.min,
            column: columnLocation.min,
            seatId: this.computeSeatId(rowLocation.min, columnLocation.min)
        };
    }

    decodeAllBoardingPasses() {
        this.decodedBoardingPasses = [];
        
        let highestSeatId = 0;
        for (let i = 0; i < this.rawBoardingPasses.length; i++) {
            let decodedBoardingPass = this.decodeBoardingPass(this.rawBoardingPasses[i]);
            this.decodedBoardingPasses[decodedBoardingPass.seatId] = decodedBoardingPass;
            if (decodedBoardingPass.seatId > highestSeatId) {
                highestSeatId = decodedBoardingPass.seatId;
            }
        }
        this.highestSeatId = highestSeatId;
    }

    findMySeat() {
        for (let i = 0; i < this.decodedBoardingPasses.length; i++) {
            if (this.decodedBoardingPasses[i]) {
                // seat filled, move along.
            } else {
                if (i === 0 || i === 954) {
                    // skip ends
                } else {
                    if (this.decodedBoardingPasses[i-1] && this.decodedBoardingPasses[i+1]) {
                        return i;
                    }
                }

            }

        }
    }



};
