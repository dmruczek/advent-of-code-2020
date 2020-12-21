const { start } = require('repl');

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
        this.joltageAdapterArray.push(this.joltageAdapterArray[this.joltageAdapterArray.length - 1] + 3);
    }

    getNumberOfJoltageDifferences(joltageDifference) {
        let count = 0;
        for (let i = 0; i < (this.joltageAdapterArray.length - 1); i++) {
            if (this.joltageAdapterArray[i + 1] - this.joltageAdapterArray[i] === joltageDifference) {
                count++;
            }
        }
        return count;
    }

    /**
     * Splits an adapter array into segments.  Each segment is 3 joltage away from the next segment.
     * Array passed in must already be sorted.
     * @param {*} adapterArray 
     */
    splitAdapterArrayIntoSegments(adapterArray) {
        let segmentArray = [];
        let startSegmentIndex = 0;
        for (let i = 1; i < adapterArray.length; i++) {
            if (i+1 >= adapterArray.length) {
                segmentArray.push(adapterArray.slice(startSegmentIndex, i+1));
            }
            if (adapterArray[i + 1] - adapterArray[i] === 3) {
                segmentArray.push(adapterArray.slice(startSegmentIndex, i+1));
                startSegmentIndex = i+1;
            }
        }
        return segmentArray;
    }

    calculateNumberOfPossibleConnectionsForSegment(adapterSegment) {

        let removalOptions = [];
        removalOptions.push(undefined);

        for (let i = 1; i < (adapterSegment.length - 1); i++) {

            if ((adapterSegment[i + 1] - adapterSegment[i - 1]) <= 3) {
                removalOptions.push(adapterSegment[i]);
            }
            if (((i + 2) < adapterSegment.length) && (adapterSegment[i + 2] - adapterSegment[i - 1]) <= 3) {
                removalOptions.push([adapterSegment[i], adapterSegment[i + 1]]);
            }
        }
        return removalOptions.length;
    }

};
