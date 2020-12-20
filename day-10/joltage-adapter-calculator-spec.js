describe("JoltageAdapterCalculator", function () {

    const JoltageAdapterCalculator = require('./joltage-adapter-calculator.js');

    describe("loadJoltageAdaptersFromFile", function () {

        it("should properly load and sort the joltage adapters", function () {
            const joltageAdapterCalculator = new JoltageAdapterCalculator();
            joltageAdapterCalculator.loadJoltageAdaptersFromFile("test-input.txt");
            const adapterArray = joltageAdapterCalculator.joltageAdapterArray;
            for (let i = 0; i < (adapterArray.length - 1); i++) {
                expect (adapterArray[i] <= adapterArray[i+1]).toBe(true);
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
    

    
 
});