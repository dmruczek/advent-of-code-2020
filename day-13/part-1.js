const BusSchedule = require('./bus-schedule.js');
const busSchedule = new BusSchedule();
busSchedule.loadScheduleFromFile('input.txt');
const nextAvailableBus = busSchedule.findNextAvailableBus();
console.log("Next available bus is Bus", nextAvailableBus.busId, "at", nextAvailableBus.arrivalTime, "for a wait time of", nextAvailableBus.waitTime, "minutes.");
console.log("Answer is:", nextAvailableBus.waitTime*nextAvailableBus.busId);