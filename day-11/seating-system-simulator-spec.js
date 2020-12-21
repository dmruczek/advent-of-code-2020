describe("SeatingSystemSimulator", function () {

    const SeatingSystemSimulator = require('./seating-system-simulator.js');

    describe("loadSeatingChartFromString", function () {

        it("should properly load a seating chart", function () {
            const seatingSystemSimulator = new SeatingSystemSimulator();
            seatingSystemSimulator.loadSeatingChartFromString('L..\r\n.L.\n..L');
            const expected = [
                ['L', '.', '.'],
                ['.', 'L', '.'],
                ['.', '.', 'L']
            ];
            expect(seatingSystemSimulator.seatingChart).toEqual(expected);

        });

    });

    describe("simulateStep", function () {

        it("should properly simulate one step", function () {
            const seatingSystemSimulator = new SeatingSystemSimulator();
            seatingSystemSimulator.loadSeatingChartFromFile('test-input.txt');
            seatingSystemSimulator.simulateStep();

        });

    });

    describe("determineNextState", function () {

        it("should properly simulate one step", function () {
            const seatingSystemSimulator = new SeatingSystemSimulator();


            let previousState = [
                ['.', '.', '.'],
                ['.', '.', '.'],
                ['.', '.', '.']
            ];
            expect(seatingSystemSimulator.determineNextState(previousState, 1, 1)).toBe('.');

            previousState = [
                ['.', '.', '.'],
                ['.', 'L', '.'],
                ['.', '.', '.']
            ];
            expect(seatingSystemSimulator.determineNextState(previousState, 1, 1)).toBe('#');

            previousState = [
                ['.', '#', '.'],
                ['.', 'L', '#'],
                ['.', '#', '.']
            ];
            expect(seatingSystemSimulator.determineNextState(previousState, 1, 1)).toBe('L');

            previousState = [
                ['.', '#', '.'],
                ['#', 'L', '#'],
                ['.', '#', '.']
            ];
            expect(seatingSystemSimulator.determineNextState(previousState, 1, 1)).toBe('L');

            previousState = [
                ['.', '#', '.'],
                ['#', '#', '#'],
                ['.', '#', '.']
            ];
            expect(seatingSystemSimulator.determineNextState(previousState, 1, 1)).toBe('L');

            previousState = [
                ['#', '#', '.'],
                ['#', '.', '.'],
                ['.', '.', '.']
            ];
            expect(seatingSystemSimulator.determineNextState(previousState, 0, 0)).toBe('#');

            previousState = [
                ['.', '.', '.'],
                ['.', '.', '#'],
                ['.', '#', '#']
            ];
            expect(seatingSystemSimulator.determineNextState(previousState, 2, 2)).toBe('#');

            previousState = [
                ['.', '#', '.'],
                ['#', '#', '.'],
                ['#', '#', '.']
            ];
            expect(seatingSystemSimulator.determineNextState(previousState, 0, 1)).toBe('L');

        });

    });

    describe("simulateStep", function () {

        it("should properly simulate one step", function () {
            const seatingSystemSimulator = new SeatingSystemSimulator();

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
            const expectedStep2 = `#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##`;

            expect(seatingSystemSimulator.getSeatingChartAsString()).toEqual(expectedStep2);

            seatingSystemSimulator.simulateStep();
            const expectedStep3 = `#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##`;
            expect(seatingSystemSimulator.getSeatingChartAsString()).toEqual(expectedStep3);


        });

    });

    describe("simulate", function () {

        it("should properly simulate until the appropriate conclusion", function () {
            const seatingSystemSimulator = new SeatingSystemSimulator();
            seatingSystemSimulator.loadSeatingChartFromFile('test-input.txt');
            seatingSystemSimulator.simulate();
            expect(seatingSystemSimulator.countOccupiedSeats()).toBe(37);

        });

    });


});