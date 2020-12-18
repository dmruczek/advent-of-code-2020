const BoardingPassDecoder = require('./boarding-pass-decoder.js');

const boardingPassDecoder = new BoardingPassDecoder();
boardingPassDecoder.decodeAllBoardingPasses();
console.log("Found my seat!  ", boardingPassDecoder.findMySeat());

