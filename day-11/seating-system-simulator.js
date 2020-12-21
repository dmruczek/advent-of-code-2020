const { DH_UNABLE_TO_CHECK_GENERATOR } = require('constants');
const { exit } = require('process');

module.exports = class SeatingSystemSimulator {

    constructor() {

    }

    loadSeatingChartFromString(str) {
        str = str.replace(/\r\n/g, '\n');
        let data = str.split('\n');
        this.seatingChart = [];
        for (let i = 0; i < data.length; i++) {
            this.seatingChart.push(Array.from(data[i]));
        }
    }

    loadSeatingChartFromFile(filename) {
        const path = require('path');
        const fs = require('fs');

        let data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        this.loadSeatingChartFromString(data);
    }

    isSpotOccupied(seatingChart, x, y) {
        if (x < 0 || x >= seatingChart[0].length || y < 0 || y >= seatingChart.length) {
            return false;
        }
        return seatingChart[y][x] === '#';
    }

    determineNextState(previousSeatingChart, x, y) {
        if (previousSeatingChart[y][x] === '.') {
            return '.';
        }

        let numOccupiedNeighbors = 0;
        for (let xOffset = -1; xOffset < 2; xOffset++) {
            for (let yOffset = -1; yOffset < 2; yOffset++) {
                if ((yOffset !== 0 || xOffset !== 0) && (this.isSpotOccupied(previousSeatingChart, x + xOffset, y + yOffset))) {
                    numOccupiedNeighbors++;
                }
            }
        }

        if (numOccupiedNeighbors >= 4) {
            return 'L';
        } else if (numOccupiedNeighbors === 0) {
            return '#';
        } else {
            return previousSeatingChart[y][x];
        }

    }

    simulateStep() {
        let previousSeatingChart = [...this.seatingChart];
        let newSeatingChart = [];
        for (let i = 0; i < previousSeatingChart.length; i++) {
            newSeatingChart.push([]);
        }

        for (let i = 0; i < previousSeatingChart.length; i++) {
            for (let j = 0; j < previousSeatingChart[i].length; j++) {
                newSeatingChart[i][j] = this.determineNextState(previousSeatingChart, j, i);
            }
        }
        this.seatingChart = newSeatingChart;

    }

    simulate() {
        let previousSeatingChartStringified, newSeatingChartStringified;
        do {
            previousSeatingChartStringified = JSON.stringify([...this.seatingChart]);
            this.simulateStep();
            newSeatingChartStringified = JSON.stringify(this.seatingChart);
        } while (previousSeatingChartStringified !== newSeatingChartStringified);

    }

    countOccupiedSeats() {
        let count = 0;
        for (let i = 0; i < this.seatingChart.length; i++) {
            for (let j = 0; j < this.seatingChart[0].length; j++) {
                if (this.seatingChart[i][j] === '#') {
                    count++;
                }
            }
        }
        return count;
    }

    getSeatingChartAsString() {
        let tempArray = [];
        for (let i = 0; i < this.seatingChart.length; i++) {
            tempArray.push(this.seatingChart[i].join(''));
        }

        return tempArray.join('\n');

    }

    printSeatingChart() {
        console.log(this.getSeatingChartAsString());
    }

    simulateAndDisplay() {
        console.clear();
        this.printSeatingChart();
        const self = this;
        setTimeout(function () { self.simulateStepAndDisplay(self); }, 500);
    }

    simulateStepAndDisplay(self) {
        let previousSeatingChartStringified = JSON.stringify([...self.seatingChart]);
        self.simulateStep();
        console.clear();
        self.printSeatingChart();
        let newSeatingChartStringified = JSON.stringify(self.seatingChart);
        if (previousSeatingChartStringified === newSeatingChartStringified) {
            exit(0);
        }
        setTimeout(function () { self.simulateStepAndDisplay(self); }, 500);
    }

};
