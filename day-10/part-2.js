const JoltageAdapterCalculator = require('./joltage-adapter-calculator');
const joltageAdapterCalculator = new JoltageAdapterCalculator();
joltageAdapterCalculator.loadJoltageAdaptersFromFile('input.txt');
const possibleConnections = joltageAdapterCalculator.calculateNumberOfPossibleConnections();
console.log("Number of possible connections:", possibleConnections);
