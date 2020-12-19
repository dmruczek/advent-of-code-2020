module.exports = class Computer {

    constructor(configObj) {
        if (configObj) {
            this.debug = configObj.debug;
        }
        this.accumulator = 0;
        this.instructionPointer = 0;
        this.instructionMap = {
            'acc': this.executeAcc,
            'jmp': this.executeJmp,
            'nop': this.executeNop
        };
    }

    loadInstructionsFromFile(filename) {
        const path = require('path');
        const fs = require('fs');

        let data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        data = data.replace(/\r\n/g, '\n');
        this.rawInstructionArray = data.split('\n');
        this.instructionArray = [];
        for (let i = 0; i < this.rawInstructionArray.length; i++) {
            this.instructionArray.push(this.parseInstruction(this.rawInstructionArray[i]));
        }
    }

    parseInstruction(rawInstruction) {
        const re = /^(\w+)\s+([\+\-]\d+)$/;
        const match = rawInstruction.match(re);
        return {
            operation: match[1],
            argument: parseInt(match[2])
        };
    }

    executeAcc(self, argument) {
        self.accumulator += argument;
        self.instructionPointer ++;
    }

    executeJmp(self, argument) {
        self.instructionPointer += argument;
    }

    executeNop(self) {
        self.instructionPointer ++;
    }

    executeInstruction(instruction) {

        const operationFunction = this.instructionMap[instruction.operation];
        if (operationFunction) {
            operationFunction(this, instruction.argument);
        } else {
            throw 'unrecognized operation: ' + instruction.operation;
        }

        if (this.debug) {
            console.log("Executing:", instruction.operation, instruction.argument);
            console.log("ACC:", this.accumulator, "POS:", this.instructionPointer);
        }

    }

    runUntilRepeat() {

        let instructionsExecuted = [];
        while (!instructionsExecuted.includes(this.instructionPointer)) {
            instructionsExecuted.push(this.instructionPointer);
            this.executeInstruction(this.instructionArray[this.instructionPointer]);
        }
    }

};
