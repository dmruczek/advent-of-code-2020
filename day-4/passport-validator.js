'use strict';

module.exports = class Map {
    constructor(useTestData) {
        this.initialize(useTestData);
        this.validPassports = 0;
    }

    parseData(filename) {
        const fs = require('fs');
        let data = fs.readFileSync(filename, 'utf-8');
        this.passports = data.split('\r\n\r\n');
    }

    isValid(passport) {
        return /.*byr:[^\s]/.test(passport) &&
            /.*iyr:[^\s]/.test(passport) &&
            /.*eyr:[^\s]/.test(passport) &&
            /.*hgt:[^\s]/.test(passport) &&
            /.*hcl:[^\s]/.test(passport) &&
            /.*ecl:[^\s]/.test(passport) &&
            /.*pid:[^\s]/.test(passport);

    }

    printPassports() {
        for (let i = 0; i < this.passports.length; i++) {
            console.log(this.passports[i] + '\n\n\n');
        }
    }

    initialize(useTestData) {
        if (useTestData) {
            this.parseData('test-input.txt');
        } else {
            this.parseData('input.txt');
        }
    }

    validateAllPassports() {
        for (let i = 0; i < this.passports.length; i++) {
            console.log(this.passports[i]);
            let valid = this.isValid(this.passports[i]);
            if (valid) {
                console.log('VALID\n');
                this.validPassports++;
            } else {
                console.log('INVALID\n');
            }
        }
    }

}
