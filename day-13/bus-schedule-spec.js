describe("BusSchedule", function () {

    const BusSchedule = require('./bus-schedule.js');

    describe("loadScheduleFromFile", function () {

        it("should properly load schedules", function () {
            const busSchedule = new BusSchedule();
            busSchedule.loadScheduleFromFile('test-input.txt');
            expect(busSchedule.currentTime).toEqual(939);
            expect(busSchedule.busOptions).toEqual([7,13,59,31,19]);
        });

    });


    describe("loadScheduleFromFile", function () {

        it("should properly load schedules", function () {
            const busSchedule = new BusSchedule();
            busSchedule.currentTime = 939;
            expect(busSchedule.findTimeOfNextArrival(7)).toBe(945);
            expect(busSchedule.findTimeOfNextArrival(13)).toBe(949);
            expect(busSchedule.findTimeOfNextArrival(59)).toBe(944);
        });

    });

    describe("findNextAvailableBus", function () {

        it("should properly identify the next available bus", function () {
            const busSchedule = new BusSchedule();
            busSchedule.loadScheduleFromFile('test-input.txt');
            expect(busSchedule.findNextAvailableBus()).toEqual({ busId: 59, arrivalTime: 944, waitTime: 5 });
        });

    });


});