describe("ShipNavigator", function () {

    const ShipNavigator = require('./ship-navigator.js');

    describe("loadInstructionsFromString", function () {

        it("should properly load instructions", function () {
            const shipNavigator = new ShipNavigator();
            shipNavigator.loadInstructionsFromString('F10\nN3\nF7\nR90\nF11');
            const expectedInstructions = [
                {action: 'F', value: 10},
                {action: 'N', value: 3},
                {action: 'F', value: 7},
                {action: 'R', value: 90},
                {action: 'F', value: 11},
            ];
            expect(shipNavigator.instructions).toEqual(expectedInstructions);

        });

    });

    describe("implementAllInstructions", function () {

        it("should properly implement all instructions", function () {
            const shipNavigator = new ShipNavigator();
            shipNavigator.loadInstructionsFromString('F10\nN3\nF7\nR90\nF11');
            shipNavigator.implementAllInstructions();
            const result = shipNavigator.calculateManhattanDistanceFromOrigin();
            expect(result).toEqual(25);
        });

    });

    describe("implementInstruction", function () {

        it("should handle L/R instructions", function () {
            const shipNavigator = new ShipNavigator();
            shipNavigator.heading = 'N';
            shipNavigator.implementInstruction({action:'R', value: 180});
            expect(shipNavigator.heading).toBe('S');

            shipNavigator.heading = 'N';
            shipNavigator.implementInstruction({action:'L', value: 180});
            expect(shipNavigator.heading).toBe('S');

            shipNavigator.heading = 'E';
            shipNavigator.implementInstruction({action:'L', value: 270});
            expect(shipNavigator.heading).toBe('S');

        });

    });
    

});