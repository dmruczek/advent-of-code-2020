describe("Data Processor", function () {

    const dataProcessor = require('./data-processor.js');


    describe("parseLine", function () {

        it("should properly parse a line", function () {
            const expected = { from: 1, to: 3, char: 'a', password: 'abcde', original: '1-3 a: abcde' };
            const actual = dataProcessor.parseLine('1-3 a: abcde');
            expect(actual).toEqual(expected);
        });

    });

    describe("mapData", function () {

        it("should properly map the data", function () {
            const expected = [
                {
                    from: 1,
                    to: 2,
                    char: 'x',
                    password: 'xpxc',
                    original: '1-2 x: xpxc'
                },
                {
                    from: 1,
                    to: 5,
                    char: 'b',
                    password: 'bwlbbbbcq',
                    original: '1-5 b: bwlbbbbcq'
                }
            ];

            const actual = dataProcessor.mapData(['1-2 x: xpxc', '1-5 b: bwlbbbbcq']);

            expect(actual).toEqual(expected);
        });

    });

});