const Computer = require('./computer.js');
const computer = new Computer();
computer.loadInstructionsFromFile('input.txt');
computer.repairProgram();
console.log("Accumulator value after repair:", computer.accumulator);