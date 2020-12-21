const { start } = require('repl');

module.exports = class JoltageAdapterCalculator {

    constructor() {
    }

    setJoltageAdapterArray(joltageAdapterArray) {
        this.joltageAdapterArray = joltageAdapterArray;
        this.joltageAdapterArray = this.sortAdapterArrayAndAddTerminals(this.joltageAdapterArray);
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
        this.joltageAdapterArray = this.sortAdapterArrayAndAddTerminals(this.joltageAdapterArray);
    }

    sortAdapterArrayAndAddTerminals(adapterArray) {
        adapterArray.push(0);
        adapterArray.sort(function (a, b) { return a - b; });
        adapterArray.push(adapterArray[adapterArray.length - 1] + 3);
        return adapterArray;
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
            if (i + 1 >= adapterArray.length) {
                segmentArray.push(adapterArray.slice(startSegmentIndex, i + 1));
            }
            if (adapterArray[i + 1] - adapterArray[i] === 3) {
                segmentArray.push(adapterArray.slice(startSegmentIndex, i + 1));
                startSegmentIndex = i + 1;
            }
        }
        return segmentArray;
    }

    /**
     * Calculates the number of possible ways to connect the adapters in this segment.  This is done
     * by removing elements one at a time without violating the rule that adapters must be separated
     * by no more than 3 joltage.  Each resulting adapter list is then itself checked to see if any
     * other adapters could also be removed.
     * @param {*} adapterSegment 
     */
    calculatePossibleOptionsForSegment(adapterSegment) {
        let options = [];
        for (let i = 1; i < (adapterSegment.length - 1); i++) {
            if ((adapterSegment[i + 1] - adapterSegment[i - 1]) <= 3) {
                options.push([...adapterSegment]);
                options[options.length - 1].splice(i, 1);
            }
        }

        let moreOptions = [];
        for (let i = 0; i < options.length; i++) {
            let moreOptionsToAdd = this.calculatePossibleOptionsForSegment(options[i]);
            for (let j = 0; j < moreOptionsToAdd.length; j++) {
                if (!this.doesArrayExistWithinArray(moreOptions, moreOptionsToAdd[j])) {
                    moreOptions.push(moreOptionsToAdd[j]);
                }
            }
        }

        options.push(adapterSegment);
        for (let i = 0; i < moreOptions.length; i++) {
            if (!this.doesArrayExistWithinArray(options, moreOptions[i])) {
                options.push(moreOptions[i]);

            }
        }

        return options;
    }

    doesArrayExistWithinArray(containingArray, containedArray) {
        const containedArrayAsString = JSON.stringify(containedArray);
        return containingArray.some(function (ele) {
            return JSON.stringify(ele) === containedArrayAsString;
        });
    }


    calculateNumberOfPossibleConnectionsForSegment(adapterSegment) {
        const options = this.calculatePossibleOptionsForSegment(adapterSegment);
        return options.length;
    }


    calculateNumberOfPossibleConnections() {
        let totalNumberOfPossibilities = 1;
        let segmentArray = this.splitAdapterArrayIntoSegments(this.joltageAdapterArray);
        for (let i = 0; i < segmentArray.length; i++) {
            let segmentPossibilityCount = this.calculateNumberOfPossibleConnectionsForSegment(segmentArray[i]);
            totalNumberOfPossibilities *= segmentPossibilityCount;
        }
        return totalNumberOfPossibilities;
    }

};
