const BoardingPassDecoder = require('./boarding-pass-decoder.js');

const boardingPassDecoder = new BoardingPassDecoder();
boardingPassDecoder.decodeAllBoardingPasses();
console.log("Highest SeatId:  ", boardingPassDecoder.highestSeatId);
