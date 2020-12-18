'use strict';

const { group } = require('console');

module.exports = class CustomsFormProcessor {
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

        for (let i = 0; i < individualDataArray.length; i++) {
            for (let j = 0; j < individualDataArray[i].length; j++) {
                const thisAnswer = individualDataArray[i].charAt(j);
                if (!aggregateAnswersArray.includes(thisAnswer)) {
                    aggregateAnswersArray.push(thisAnswer);
                }
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
