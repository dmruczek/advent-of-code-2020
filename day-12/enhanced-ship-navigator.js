
module.exports = class EnhancedShipNavigator {

    constructor() {
        this.heading = 'E';
        this.shipPositionX = 0;
        this.shipPositionY = 0;
        this.waypointPositionX = 10;
        this.waypointPositionY = -1;
    }

    loadInstructionsFromString(str) {
        str = str.replace(/\r\n/g, '\n');
        let data = str.split('\n');
        this.instructions = [];
        for (let i = 0; i < data.length; i++) {
            const re = /(\w)(\d+)/;
            const match = data[i].match(re);

            this.instructions.push({
                action: match[1],
                value: parseInt(match[2])
            });
            
        }
    }

    loadInstructionsFromFile(filename) {
        const path = require('path');
        const fs = require('fs');

        let data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        this.loadInstructionsFromString(data);
    }

    moveTowardsWaypoint(magnitude) {
        this.shipPositionX += (magnitude * this.waypointPositionX);
        this.shipPositionY += (magnitude * this.waypointPositionY);
    }

    rotateWaypointClockwiseNinetyDegrees() {
        let newWaypointPositionX = -this.waypointPositionY;
        let newWaypointPositionY = this.waypointPositionX;
        this.waypointPositionX = newWaypointPositionX;
        this.waypointPositionY = newWaypointPositionY;
    }

    implementInstruction(instruction) {

        let action = instruction.action;
        let value = instruction.value;

        if (action === 'R' || action === 'L') {
            if (action ==='L') {
                value = 360-value;
            }
            while (value > 0) {
                value -= 90;
                this.rotateWaypointClockwiseNinetyDegrees();
            }
            return;
        }

        if (action ==='F') {
            this.moveTowardsWaypoint(value);
        } 

        if (action === 'N') {
            this.waypointPositionY -= value;
        } else if (action === 'S') {
            this.waypointPositionY += value;
        } else if (action === 'E') {
            this.waypointPositionX += value;
        } else if (action === 'W') {
            this.waypointPositionX -= value;
        }
    }


    printState() {

        let waypointXText, waypointYText, shipXText, shipYText;
        if (this.waypointPositionX < 0) {
            waypointXText = Math.abs(this.waypointPositionX) + ' units west';
        } else {
            waypointXText = Math.abs(this.waypointPositionX) + ' units east';

        }

        if (this.waypointPositionY < 0) {
            waypointYText = Math.abs(this.waypointPositionY) + ' units north';
        } else {
            waypointYText = Math.abs(this.waypointPositionY) + ' units south';

        }

        if (this.shipPositionX < 0) {
            shipXText = Math.abs(this.shipPositionX) + ' units west';
        } else {
            shipXText = Math.abs(this.shipPositionX) + ' units east';

        }

        if (this.shipPositionY < 0) {
            shipYText = Math.abs(this.shipPositionY) + ' units north';
        } else {
            shipYText = Math.abs(this.shipPositionY) + ' units south';

        }


        console.log("Waypoint is at " + waypointXText + ", " + waypointYText + ".  Ship is at " + shipXText + ", " + shipYText);
    }    

    implementAllInstructions() {
        // this.printState();        
        for (let i = 0; i < this.instructions.length; i++) {
            this.implementInstruction(this.instructions[i]);
            // this.printState();
        }
    }



    calculateManhattanDistanceFromOrigin() {
        let x = Math.abs(this.shipPositionX);
        let y = Math.abs(this.shipPositionY);
        return x + y;
    }

};
