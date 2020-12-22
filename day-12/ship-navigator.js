
module.exports = class ShipNavigator {

    constructor() {
        this.heading = 'E';
        this.positionX = 0;
        this.positionY = 0;
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

    implementInstruction(instruction) {

        let action = instruction.action;
        let value = instruction.value;

        if (action === 'R' || action === 'L') {
            const arr = [undefined, 'W', 'S', 'E', 'N', 'W', 'S', 'E', 'N'];
            if (action ==='R') {
                value = 360-value;
            }
            
            const indexOffset = value / 90;
            this.heading = arr[arr.indexOf(this.heading) + indexOffset];
            return;
        }

        if (action ==='F') {
            action = this.heading;
        } 

        if (action === 'N') {
            this.positionY -= value;
        } else if (action === 'S') {
            this.positionY += value;
        } else if (action === 'E') {
            this.positionX += value;
        } else if (action === 'W') {
            this.positionX -= value;
        }
    }

    implementAllInstructions() {
        for (let i = 0; i < this.instructions.length; i++) {
            this.implementInstruction(this.instructions[i]);

        }
    }

    calculateManhattanDistanceFromOrigin() {
        let x = Math.abs(this.positionX);
        let y = Math.abs(this.positionY);
        return x + y;
    }

};
