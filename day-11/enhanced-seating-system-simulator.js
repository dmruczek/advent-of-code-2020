const { exit } = require('process');
const SeatingSystemSimulator = require('./seating-system-simulator.js');

module.exports = class EnhancedSeatingSystemSimulator extends SeatingSystemSimulator {

    constructor() {
        super();
    }

    isSpotAnEmptySeat(seatingChart, x, y) {
        if (x < 0 || x >= seatingChart[0].length || y < 0 || y >= seatingChart.length) {
            return false;
        }
        return seatingChart[y][x] === 'L';
    }

    determineNextState(previousSeatingChart, x, y) {
        if (previousSeatingChart[y][x] === '.') {
            return '.';
        }
        const totalWidth = previousSeatingChart[0].length;
        const totalHeight = previousSeatingChart.length;
        let totalDistance;
        if (totalWidth > totalHeight) {
            totalDistance = totalWidth;
        } else {
            totalDistance = totalHeight;
        }

        let numVisibleSeats = 0;

        for (let xDirection = -1; xDirection < 2; xDirection++) {
            for (let yDirection = -1; yDirection < 2; yDirection++) {
                if (yDirection !== 0 || xDirection !== 0) {
                    visibilityCheck:
                    for (let offset = 1; offset < totalDistance; offset++) {
                        if (this.isSpotOccupied(previousSeatingChart, x + (offset * xDirection), y + (offset * yDirection))) {
                            numVisibleSeats++;
                            break visibilityCheck;
                        } else if (this.isSpotAnEmptySeat(previousSeatingChart, x + (offset * xDirection), y + (offset * yDirection))) {
                            break visibilityCheck;
                        }
                    }
                }
            }
        }

        if (numVisibleSeats >= 5) {
            return 'L';
        } else if (numVisibleSeats === 0) {
            return '#';
        } else {
            return previousSeatingChart[y][x];
        }

    }

};
