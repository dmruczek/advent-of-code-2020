describe("JoltageAdapterCalculator", function () {

    const JoltageAdapterCalculator = require('./joltage-adapter-calculator.js');

    describe("loadJoltageAdaptersFromFile", function () {

        it("should properly load and sort the joltage adapters", function () {
            const joltageAdapterCalculator = new JoltageAdapterCalculator();
            joltageAdapterCalculator.loadJoltageAdaptersFromFile("test-input.txt");
            const adapterArray = joltageAdapterCalculator.joltageAdapterArray;
            for (let i = 0; i < (adapterArray.length - 1); i++) {
                expect(adapterArray[i] <= adapterArray[i + 1]).toBe(true);
            }
        });

    });

    describe("getNumberOfJoltageDifferences", function () {

        it("should properly find the number of joltage differences in the adapter array.", function () {
            const joltageAdapterCalculator = new JoltageAdapterCalculator();
            joltageAdapterCalculator.loadJoltageAdaptersFromFile("test-input.txt");
            let result = joltageAdapterCalculator.getNumberOfJoltageDifferences(1);
            expect(result).toBe(22);
            result = joltageAdapterCalculator.getNumberOfJoltageDifferences(3);
            expect(result).toBe(10);

        });

    });

    describe("calculateNumberOfPossibleConnectionsForSegment", function () {

        it("should properly find the number of possible connections for a given segment", function () {
            const joltageAdapterCalculator = new JoltageAdapterCalculator();
            let result = joltageAdapterCalculator.calculateNumberOfPossibleConnectionsForSegment([1, 2, 3, 4, 5, 7]);
            expect(result).toBe(7);
        });

    });

    describe("splitAdapterArrayIntoSegments", function () {

        it("should properly split an array into segments which are separated by 3 joltage", function () {

            const adapterArray = [0, 1, 2, 3, 4, 7, 8, 9, 10,
                11, 14, 17, 18, 19, 20, 23, 24, 25,
                28, 31, 32, 33, 34, 35, 38, 39, 42,
                45, 46, 47, 48, 49, 52];

            const expected = [
                [0, 1, 2, 3, 4],
                [7, 8, 9, 10, 11],
                [14],
                [17, 18, 19, 20],
                [23, 24, 25],
                [28],
                [31, 32, 33, 34, 35],
                [38, 39],
                [42],
                [45, 46, 47, 48, 49],
                [52]
            ];

            const joltageAdapterCalculator = new JoltageAdapterCalculator();
            let result = joltageAdapterCalculator.splitAdapterArrayIntoSegments(adapterArray);
            expect(result).toEqual(expected);
        });

    });




});