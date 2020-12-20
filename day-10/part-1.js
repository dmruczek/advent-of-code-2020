const JoltageAdapterCalculator = require('./joltage-adapter-calculator');
const joltageAdapterCalculator = new JoltageAdapterCalculator();
joltageAdapterCalculator.loadJoltageAdaptersFromFile('input.txt');
const numberOfOneJoltageDifferences = joltageAdapterCalculator.getNumberOfJoltageDifferences(1);
const numberOfThreeJoltageDifferences = joltageAdapterCalculator.getNumberOfJoltageDifferences(3);
console.log("Answer is: ", numberOfOneJoltageDifferences * numberOfThreeJoltageDifferences);
