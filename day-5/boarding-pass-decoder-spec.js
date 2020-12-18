describe("BoardingPassDecoder", function() {

    const BoardingPassDecoder = require('./boarding-pass-decoder.js');
    let boardingPassDecoder = new BoardingPassDecoder(true);

    describe("decodeBoardingPass", function() {

        it ("should properly decode boarding passes", function() {
            expect(boardingPassDecoder.decodeBoardingPass('BFFFBBFRRR')).toEqual({row: 70, column: 7, seatId: 567});
            expect(boardingPassDecoder.decodeBoardingPass('FFFBBBFRRR')).toEqual({row: 14, column: 7, seatId: 119});
            expect(boardingPassDecoder.decodeBoardingPass('BBFFBBFRLL')).toEqual({row: 102, column: 4, seatId: 820});
        });

    });



});