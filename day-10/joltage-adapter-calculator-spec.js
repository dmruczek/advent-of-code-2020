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
            expect(result).toBe(11);

            result = joltageAdapterCalculator.calculateNumberOfPossibleConnectionsForSegment([23, 24, 25]);
            expect(result).toBe(2);


        });

    });

    describe("calculatePossibleOptionsForSegment", function () {

        it("should return the list of possible options for this segment", function () {
            const joltageAdapterCalculator = new JoltageAdapterCalculator();
            let result = joltageAdapterCalculator.calculatePossibleOptionsForSegment([1, 2, 3, 4, 5, 7]);
            let expected = [
                [1, 3, 4, 5, 7],
                [1, 2, 4, 5, 7],
                [1, 2, 3, 5, 7],
                [1, 2, 3, 4, 7],
                [1, 2, 3, 4, 5, 7],
                [1, 4, 5, 7],
                [1, 3, 5, 7],
                [1, 3, 4, 7],
                [1, 4, 7],
                [1, 2, 5, 7],
                [1, 2, 4, 7]
            ];
            expect(result).toEqual(expected);

            result = joltageAdapterCalculator.calculatePossibleOptionsForSegment([23, 24, 25]);
            expected = [
                [23, 25], 
                [23, 24, 25]
            ];
            expect(result).toEqual(expected);


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

    describe("calculateNumberOfPossibleConnections", function () {

        it("should properly calculate the number of possible ways to connect the adapters.", function () {
            const joltageAdapterCalculator = new JoltageAdapterCalculator();
            joltageAdapterCalculator.loadJoltageAdaptersFromFile("test-input.txt");
            let result = joltageAdapterCalculator.calculateNumberOfPossibleConnections();
            expect(result).toEqual(19208);
        });

        it("should properly calculate the number of possible ways to connect the adapters (2).", function () {
            const joltageAdapterCalculator = new JoltageAdapterCalculator();
            joltageAdapterCalculator.setJoltageAdapterArray([16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4]);
            let result = joltageAdapterCalculator.calculateNumberOfPossibleConnections();
            expect(result).toEqual(8);
        });

    });







});