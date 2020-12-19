module.exports = class Computer {

    constructor(configObj) {
        if (configObj) {
            this.debug = configObj.debug;
        }
        this.instructionMap = {
            'acc': this.executeAcc,
            'jmp': this.executeJmp,
            'nop': this.executeNop
        };

        this.initialize();
    }

    initialize() {
        this.accumulator = 0;
        this.instructionPointer = 0;
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
        self.instructionPointer++;
    }

    executeJmp(self, argument) {
        self.instructionPointer += argument;
    }

    executeNop(self) {
        self.instructionPointer++;
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
            if (this.instructionPointer >= this.instructionArray.length) {
                return 0;
            }
            instructionsExecuted.push(this.instructionPointer);
            this.executeInstruction(this.instructionArray[this.instructionPointer]);
        }
        return -1;
    }

    repairProgram() {
        for (let i = 0; i < this.instructionArray.length; i++) {
            let thisInstruction = this.instructionArray[i];
            let thisOperation = thisInstruction.operation;
            if (thisOperation === 'jmp' || thisOperation === 'nop') {
                if (this.attemptRepair(i)) {
                    return;
                }
            }
        }
    }

    attemptRepair(indexToAttemptRepair) {

        const previousOperation = this.instructionArray[indexToAttemptRepair].operation;
        if (previousOperation === 'nop') {
            this.instructionArray[indexToAttemptRepair].operation = 'jmp';
        } else if (previousOperation === 'jmp') {
            this.instructionArray[indexToAttemptRepair].operation = 'nop';
        }

        this.initialize();
        const successCode = this.runUntilRepeat();
        if (successCode === 0) {
            return true;
        } else {
            this.instructionArray[indexToAttemptRepair].operation = previousOperation;
            return false;
        }
    }

};
