const ShipNavigator = require('./ship-navigator.js');
const shipNavigator = new ShipNavigator();
shipNavigator.loadInstructionsFromFile('input.txt');
shipNavigator.implementAllInstructions();
const distance = shipNavigator.calculateManhattanDistanceFromOrigin();
console.log("Distance from origin:", distance);