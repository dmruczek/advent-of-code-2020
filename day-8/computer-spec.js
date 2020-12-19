describe("Computer", function () {

    const Computer = require('./computer.js');
    let computer;

    beforeEach(function() {
        computer = new Computer();
    });
    

    describe("parseInstruction", function () {

        it("should properly parse instructions", function () {

            let instruction = computer.parseInstruction('acc +1');
            expect(instruction).toEqual({ operation: 'acc', argument: 1 });

            instruction = computer.parseInstruction('jmp -4');
            expect(instruction).toEqual({ operation: 'jmp', argument: -4 });

            instruction = computer.parseInstruction('nop +0');
            expect(instruction).toEqual({ operation: 'nop', argument: 0 });
        });

    });

    describe("runUntilRepeat", function () {

        it("should run until the program would repeat.", function () {
            computer.loadInstructionsFromFile('test-input.txt');
            computer.runUntilRepeat();
            expect(computer.accumulator).toBe(5);

        });

    });

    describe("repairProgram", function () {

        it("should successfully repair the program.", function () {
            computer.loadInstructionsFromFile('test-input.txt');
            computer.repairProgram();
            expect(computer.accumulator).toBe(8);

        });

    });
    
    
});