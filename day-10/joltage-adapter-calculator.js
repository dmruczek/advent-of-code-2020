module.exports = class JoltageAdapterCalculator {

    constructor() {
    }

    setJoltageAdapterArray(joltageAdapterArray) {
        this.joltageAdapterArray = joltageAdapterArray;
    }

    loadJoltageAdaptersFromFile(filename) {
        const path = require('path');
        const fs = require('fs');

        let data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        data = data.replace(/\r\n/g, '\n');
        this.rawJoltageAdapterData = data.split('\n');
        this.joltageAdapterArray = [];
        for (let i = 0; i < this.rawJoltageAdapterData.length; i++) {
            this.joltageAdapterArray.push(parseInt(this.rawJoltageAdapterData[i]));
        }
        this.joltageAdapterArray.push(0);
        this.joltageAdapterArray.sort(function (a, b) { return a - b; });
        this.joltageAdapterArray.push(this.joltageAdapterArray[this.joltageAdapterArray.length-1] + 3);
    }

    getNumberOfJoltageDifferences(joltageDifference) {
        let count = 0;
        for (let i = 0; i < (this.joltageAdapterArray.length - 1); i++) {
            if (this.joltageAdapterArray[i+1] - this.joltageAdapterArray[i] === joltageDifference) {
                count++;
            }
        }
        return count;
    }

};
