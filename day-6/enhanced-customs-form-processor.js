'use strict';

const { group } = require('console');

module.exports = class EnhancedCustomsFormProcessor {
    constructor(useTestData) {
        this.initialize(useTestData);
    }

    initialize(useTestData) {
        if (useTestData) {
            this.parseData('test-input.txt');
        } else {
            this.parseData('input.txt');
        }
    }

    parseData(filename) {
        const path = require('path');
        const fs = require('fs');

        let data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        data = data.replace(/\r\n/g, '\n');
        this.rawGroupDataList = data.split('\n\n');
    }

    processGroup(groupData) {
        const individualDataArray = groupData.split('\n');
        let aggregateAnswersArray = [];

        for (let i = 0; i < individualDataArray[0].length; i++) {
            let thisChar = individualDataArray[0].charAt(i);
            let allContainChar = true;
            for (let j = 0; j < individualDataArray.length; j++) {
                allContainChar = allContainChar && individualDataArray[j].indexOf(thisChar) > -1;
            }
            if (allContainChar) {
                aggregateAnswersArray.push(thisChar);
            }

        }

        return {
            individualAnswers: individualDataArray,
            aggregateAnswers: aggregateAnswersArray.join(''),
            uniqueAnswerCount: aggregateAnswersArray.length
        };
    }

    countAllGroupAnswers() {
        let totalAnswers = 0;
        for (let i = 0; i < this.rawGroupDataList.length; i++) {
            let groupData = this.processGroup(this.rawGroupDataList[i]);
            totalAnswers += groupData.uniqueAnswerCount;
        }
        return totalAnswers;
    }



};
