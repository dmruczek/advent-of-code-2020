const Computer = require('./computer.js');
const computer = new Computer();
computer.loadInstructionsFromFile('input.txt');
computer.runUntilRepeat();
console.log("Accumulator value before repeat:", computer.accumulator);

