module.exports = class XMASCypherValidator {

    constructor(preambleLength) {
        this.preambleLength = preambleLength;
    }

    setCypherArray(cypherArray) {
        this.cypherArray = cypherArray;
    }

    loadCypherFromFile(filename) {
        const path = require('path');
        const fs = require('fs');

        let data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        data = data.replace(/\r\n/g, '\n');
        this.rawCypherDataArray = data.split('\n');
        this.cypherArray = [];
        for (let i = 0; i < this.rawCypherDataArray.length; i++) {
            this.cypherArray.push(parseInt(this.rawCypherDataArray[i]));
        }
    }

    isCypherValueAtIndexValid(index) {
        if (index <= this.preambleLength) {
            return true;
        }

        const preamble = this.cypherArray.slice(index-(this.preambleLength), index);

        for (let i = 0; i < preamble.length; i++) {
            for (let j = 0; j < preamble.length; j++) {
                if (i !== j && preamble[i] + preamble[j] === this.cypherArray[index]) {
                    return true;
                }
            }
        }
        return false;
    }

    findFirstInvalidValue() {
        for (let i = 0; i < this.cypherArray.length; i++) {
            if (!this.isCypherValueAtIndexValid(i)) {
                return this.cypherArray[i];
            }
        }
    }

};
