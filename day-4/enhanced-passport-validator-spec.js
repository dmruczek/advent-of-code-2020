describe("Enhanced Passport Validator", function() {

    const PassportValidator = require('./enhanced-passport-validator.js');

    let passportValidator = new PassportValidator(true);


    describe("validateYear", function() {

        it ("should properly validate years", function() {
            expect(passportValidator.validateYear('2000', 1999, 2001)).toBe(true);
            expect(passportValidator.validateYear('2000', 2000, 2000)).toBe(true);
            expect(passportValidator.validateYear('1998', 1999, 2001)).toBe(false);
            expect(passportValidator.validateYear('2002', 1999, 2001)).toBe(false);
        });

    });

    describe("validateHgt", function() {
        it ("should properly validate heights", function() {
            expect(passportValidator.validateHgt('70in')).toBe(true);
            expect(passportValidator.validateHgt('170in')).toBe(false);
            expect(passportValidator.validateHgt('170cm')).toBe(true);
            expect(passportValidator.validateHgt('70cm')).toBe(false);
            expect(passportValidator.validateHgt('70xx')).toBe(false);

            expect(passportValidator.validateHgt('60in')).toBe(true);
            expect(passportValidator.validateHgt('190cm')).toBe(true);
            expect(passportValidator.validateHgt('190in')).toBe(false);
            expect(passportValidator.validateHgt('190')).toBe(false);
        });
    });

    describe("validateByr", function() {
        it ("should properly validate Birth Years", function() {
            expect(passportValidator.validateByr('2002')).toBe(true);
            expect(passportValidator.validateByr('2003')).toBe(false);
        });
    });

    describe("validateEcl", function() {
        it ("should properly validate Eye Color", function() {
            expect(passportValidator.validateEcl('brn')).toBe(true);
            expect(passportValidator.validateEcl('wat')).toBe(false);
        });
    });

    describe("validatePid", function() {
        it ("should properly validate Passport Id", function() {
            expect(passportValidator.validatePid('000000001')).toBe(true);
            expect(passportValidator.validatePid('0123456789')).toBe(false);
        });
    });

    describe("isValid", function() {

        it ("should properly identify valid passports", function() {
            let passport = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
            hcl:#623a2f`;
            expect(passportValidator.isValid(passport)).toBe(true);

            passport = `eyr:2029 ecl:blu cid:129 byr:1989
            iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm`;
            expect(passportValidator.isValid(passport)).toBe(true);

            passport = `hcl:#888785
            hgt:164cm byr:2001 iyr:2015 cid:88
            pid:545766238 ecl:hzl
            eyr:2022`;
            expect(passportValidator.isValid(passport)).toBe(true);

            passport = `iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;
            expect(passportValidator.isValid(passport)).toBe(true);
        });

        it ("should properly identify invalid passports", function() {
            passport = `eyr:1972 cid:100
            hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926`;
            expect(passportValidator.isValid(passport)).toBe(false);

            passport = `iyr:2019
            hcl:#602927 eyr:1967 hgt:170cm
            ecl:grn pid:012533040 byr:1946`;
            expect(passportValidator.isValid(passport)).toBe(false);

            passport = `hcl:dab227 iyr:2012
            ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277`;
            expect(passportValidator.isValid(passport)).toBe(false);

            passport = `hgt:59cm ecl:zzz
            eyr:2038 hcl:74454a iyr:2023
            pid:3556412378 byr:2007`;
            expect(passportValidator.isValid(passport)).toBe(false);
        });

    });


});