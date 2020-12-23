const EnhancedShipNavigator = require('./enhanced-ship-navigator.js');
const shipNavigator = new EnhancedShipNavigator();
shipNavigator.loadInstructionsFromFile('input.txt');
shipNavigator.implementAllInstructions();
const distance = shipNavigator.calculateManhattanDistanceFromOrigin();
console.log("Distance from origin:", distance);