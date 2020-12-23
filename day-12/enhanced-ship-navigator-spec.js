describe("EnhancedShipNavigator", function () {

    const EnhancedShipNavigator = require('./enhanced-ship-navigator.js');

    describe("loadInstructionsFromString", function () {

        it("should properly load instructions", function () {
            const shipNavigator = new EnhancedShipNavigator();
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
            const shipNavigator = new EnhancedShipNavigator();
            shipNavigator.loadInstructionsFromString('F10\nN3\nF7\nR90\nF11');
            shipNavigator.implementAllInstructions();
            const result = shipNavigator.calculateManhattanDistanceFromOrigin();
            expect(result).toEqual(286);
        });

    });

    describe("moveTowardsWaypoint", function () {

        it("should properly move towards the waypoint the number of times given by the argument", function () {
            const shipNavigator = new EnhancedShipNavigator();
            shipNavigator.waypointPositionX = 4;
            shipNavigator.waypointPositionY = 10;
            shipNavigator.shipPositionX = 170;
            shipNavigator.shipPositionY = -38;
            shipNavigator.moveTowardsWaypoint(11);
            expect(shipNavigator.shipPositionX).toEqual(214);
            expect(shipNavigator.shipPositionY).toEqual(72);
        });

    });

    describe("rotateWaypointClockwiseNinetyDegrees", function () {

        it("should properly rotate the waypoint.", function () {
            const shipNavigator = new EnhancedShipNavigator();
            shipNavigator.waypointPositionX = 10;
            shipNavigator.waypointPositionY = -4;
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            expect(shipNavigator.waypointPositionX).toBe(4);
            expect(shipNavigator.waypointPositionY).toBe(10);

            shipNavigator.waypointPositionX = 10;
            shipNavigator.waypointPositionY = -4;
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            expect(shipNavigator.waypointPositionX).toBe(-10);
            expect(shipNavigator.waypointPositionY).toBe(4);

            shipNavigator.waypointPositionX = 10;
            shipNavigator.waypointPositionY = -4;
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            expect(shipNavigator.waypointPositionX).toBe(-4);
            expect(shipNavigator.waypointPositionY).toBe(-10);

            shipNavigator.waypointPositionX = 10;
            shipNavigator.waypointPositionY = -4;
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            shipNavigator.rotateWaypointClockwiseNinetyDegrees();
            expect(shipNavigator.waypointPositionX).toBe(10);
            expect(shipNavigator.waypointPositionY).toBe(-4);
        });

    });

    
    // describe("implementInstruction", function () {

    //     it("should handle L/R instructions", function () {
    //         const shipNavigator = new ShipNavigator();
    //         shipNavigator.heading = 'N';
    //         shipNavigator.implementInstruction({action:'R', value: 180});
    //         expect(shipNavigator.heading).toBe('S');

    //         shipNavigator.heading = 'N';
    //         shipNavigator.implementInstruction({action:'L', value: 180});
    //         expect(shipNavigator.heading).toBe('S');

    //         shipNavigator.heading = 'E';
    //         shipNavigator.implementInstruction({action:'L', value: 270});
    //         expect(shipNavigator.heading).toBe('S');

    //     });

    // });
    

});