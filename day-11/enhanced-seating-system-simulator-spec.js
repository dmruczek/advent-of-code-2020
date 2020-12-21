describe("EnhancedSeatingSystemSimulator", function () {

    const EnhancedSeatingSystemSimulator = require('./enhanced-seating-system-simulator.js');

    describe("simulateStep", function () {

        it("should properly simulate one step", function () {
            const seatingSystemSimulator = new EnhancedSeatingSystemSimulator();

            const step1 = `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`;
            seatingSystemSimulator.loadSeatingChartFromString(step1);

            seatingSystemSimulator.simulateStep();
            const expectedStep2 = `#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#`;

            expect(seatingSystemSimulator.getSeatingChartAsString()).toEqual(expectedStep2);

            seatingSystemSimulator.simulateStep();
            const expectedStep3 = `#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#`;
            expect(seatingSystemSimulator.getSeatingChartAsString()).toEqual(expectedStep3);


        });

    });

    describe("simulate", function () {

        it("should properly simulate until the appropriate conclusion", function () {
            const seatingSystemSimulator = new EnhancedSeatingSystemSimulator();
            seatingSystemSimulator.loadSeatingChartFromFile('test-input.txt');
            seatingSystemSimulator.simulate();
            expect(seatingSystemSimulator.countOccupiedSeats()).toBe(26);

        });

    });


});