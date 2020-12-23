
module.exports = class BusSchedule {

    constructor() {}

    loadScheduleFromString(str) {
        str = str.replace(/\r\n/g, '\n');
        let data = str.split('\n');
        this.currentTime = parseInt(data[0]);
        let busArray = data[1].split(',');
        this.busOptions = [];
        for (let i = 0; i < busArray.length; i++) {
            if (busArray[i] !== 'x') {
                this.busOptions.push(parseInt(busArray[i]));
            }
        }
    }

    loadScheduleFromFile(filename) {
        const path = require('path');
        const fs = require('fs');

        let data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        this.loadScheduleFromString(data);
    }

    findTimeOfNextArrival(busId) {
        let arrivalTime = 0;
        while (arrivalTime < this.currentTime) {
            arrivalTime += busId;
        }
        return arrivalTime;
    }

    findNextAvailableBus() {

        let soonestBusTime = 99999999999;
        let soonestBusId;
        for (let i = 0; i < this.busOptions.length; i++) {
            let busArrivalTime = this.findTimeOfNextArrival(this.busOptions[i]);
            if (busArrivalTime < soonestBusTime) {
                soonestBusTime = busArrivalTime;
                soonestBusId = this.busOptions[i];
            }
        }
        return { busId: soonestBusId, arrivalTime: soonestBusTime, waitTime: soonestBusTime - this.currentTime };
    }

};
