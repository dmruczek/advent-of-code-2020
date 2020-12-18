'use strict';

module.exports = class PassportValidator {
    constructor(useTestData) {
        this.initialize(useTestData);
        this.validPassports = 0;
    }

    initialize(useTestData) {
        if (useTestData) {
            this.parseData('test-input.txt');
        } else {
            this.parseData('input.txt');
        }
    }

    parseData(filename) {
        const path = require('path');
        const fs = require('fs');
        
        let data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        this.passports = data.split('\r\n\r\n');
    }

    getFieldValue(passport, field) {
        const re = RegExp('.*' + field + '\\s*:\\s*([^\\s]+)');
        if (re.test(passport)) {
            return passport.match(re)[1];
        } else {
            return undefined;
        }
    }


    validateYear(yearStr, min, max) {
        try {
            let yearInt = parseInt(yearStr);
            return yearInt >= min && yearInt <= max;
        } catch (e) {
            return false;
        }
    }


    validateByr(byr) {
        return this.validateYear(byr, 1920, 2002);
    }

    validateIyr(iyr) {
        return this.validateYear(iyr, 2010, 2020);
    }

    validateEyr(eyr) {
        return this.validateYear(eyr, 2020, 2030);
    }

    validateHgt(hgt) {
        if (hgt) {
            let match = hgt.match(/(\d+)\s*(\w+)/);
            if (match && match.length === 3) {
                let heightInt = parseInt(match[1]);
                let heightUnit = match[2];
                if (heightUnit === 'in') {
                    return heightInt >= 59 && heightInt <= 76;
                } else if (heightUnit === 'cm') {
                    return heightInt >= 150 && heightInt <= 193;
                }
            }
        }
        return false;
    }

    validateHcl(hcl) {
        return /#[0-9a-f]{6}/.test(hcl);
    }

    validateEcl(ecl) {
        return /(amb|blu|brn|gry|grn|hzl|oth)/.test(ecl);
    }

    validatePid(pid) {
        return /\d{9}/.test(pid);
    }


    isValid(passport) {

        const byr = this.getFieldValue(passport, 'byr');
        const iyr = this.getFieldValue(passport, 'iyr');
        const eyr = this.getFieldValue(passport, 'eyr');
        const hgt = this.getFieldValue(passport, 'hgt');
        const hcl = this.getFieldValue(passport, 'hcl');
        const ecl = this.getFieldValue(passport, 'ecl');
        const pid = this.getFieldValue(passport, 'pid');

        // if (!this.validateByr(byr)) {
        //     console.log('byr invalid');
        // }
        // if (!this.validateIyr(iyr)) {
        //     console.log('iyr invalid');
        // }
        // if (!this.validateEyr(eyr)) {
        //     console.log('eyr invalid');
        // }
        // if (!this.validateHgt(hgt)) {
        //     console.log('hgt invalid');
        // }
        // if (!this.validateHcl(hcl)) {
        //     console.log('hcl invalid');
        // }
        // if (!this.validateEcl(ecl)) {
        //     console.log('ecl invalid');
        // }
        // if (!this.validatePid(pid)) {
        //     console.log('pid invalid');
        // }



        return this.validateByr(byr) &&
            this.validateIyr(iyr) &&
            this.validateEyr(eyr) &&
            this.validateHgt(hgt) &&
            this.validateHcl(hcl) &&
            this.validateEcl(ecl) &&
            this.validatePid(pid);

    }

    printPassports() {
        for (let i = 0; i < this.passports.length; i++) {
            console.log(this.passports[i] + '\n\n\n');
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
