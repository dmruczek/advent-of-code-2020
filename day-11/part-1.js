const SeatingSystemSimulator = require('./seating-system-simulator.js');
const seatingSystemSimulator = new SeatingSystemSimulator();
seatingSystemSimulator.loadSeatingChartFromFile('input.txt');
// seatingSystemSimulator.simulateAndDisplay();
seatingSystemSimulator.simulate();
const occupiedSeats = seatingSystemSimulator.countOccupiedSeats();
console.log("Number of occupied seats: " + occupiedSeats);