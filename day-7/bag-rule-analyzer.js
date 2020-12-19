module.exports = class BagRuleAnalyzer {

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
        this.rawBagRuleDataArray = data.split('\n');
    }

    decodeBagRule(rawBagRuleData) {

        const re1 = /(.*)\s+bags\scontain\s(.*)/;
        const match1 = rawBagRuleData.match(re1);
        let container = match1[1];
        let rawContained = match1[2];

        let bagRule = {
            container: container,
            contains: []
        };

        if (rawContained !== 'no other bags.') {
            rawContained = rawContained.replace(/\./g, '');
            let splitRawContained = rawContained.split(', ');
            for (let i = 0; i < splitRawContained.length; i++) {
                const re2 = /(\d+)\s(.*?)\sbags?/;
                const match2 = splitRawContained[i].match(re2);
                bagRule.contains.push({ quantity: parseInt(match2[1]), bag: match2[2] });
            }
        }
        return bagRule;
    }

    processAllBagRules() {
        this.bagRuleMap = {};
        this.validContainersForBag = {};
        for (let i = 0; i < this.rawBagRuleDataArray.length; i++) {
            const bagRule = this.decodeBagRule(this.rawBagRuleDataArray[i]);
            this.bagRuleMap[bagRule.container] = bagRule.contains;
            for (let j = 0; j < bagRule.contains.length; j++) {
                let bagToContain = bagRule.contains[j].bag;
                let bagQuantityNeeded = bagRule.contains[j].quantity;
                if (!this.validContainersForBag[bagToContain]) {
                    this.validContainersForBag[bagToContain] = [];
                }
                this.validContainersForBag[bagToContain].push({ container: bagRule.container, quantity: bagQuantityNeeded });
            }
        }
    }

    getValidContainersForBag(bagToContain) {

        let validContainers = [];
        if (this.validContainersForBag[bagToContain]) {
            for (let i = 0; i < this.validContainersForBag[bagToContain].length; i++) {
                validContainers.push(this.validContainersForBag[bagToContain][i].container);
            }

            for (let i = 0; i < validContainers.length; i++) {
                let parentContainers = this.getValidContainersForBag(validContainers[i]);
                for (let j = 0; j < parentContainers.length; j++) {
                    if (!validContainers.includes(parentContainers[j])) {
                        validContainers.push(parentContainers[j]);
                    }
                }
            }
        }
        return validContainers;
    }

};
