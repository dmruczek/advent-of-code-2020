describe("Enhanced Passport Validator", function() {

    const PassportValidator = require('./enhanced-passport-validator.js');

    let passportValidator = new PassportValidator(true);


    describe("validateYear", function() {

        it ("should work correctly", function() {
            expect(passportValidator.validateYear('2000', 1999, 2001)).toBe(true);
            expect(passportValidator.validateYear('2000', 2000, 2000)).toBe(true);
            expect(passportValidator.validateYear('1998', 1999, 2001)).toBe(false);
            expect(passportValidator.validateYear('2002', 1999, 2001)).toBe(false);
        });

    });

    describe("validateHgt", function() {
        it ("should work correctly", function() {
            expect(passportValidator.validateHgt('70in')).toBe(true);
            expect(passportValidator.validateHgt('170in')).toBe(false);
            expect(passportValidator.validateHgt('170cm')).toBe(true);
            expect(passportValidator.validateHgt('70cm')).toBe(false);
            expect(passportValidator.validateHgt('70xx')).toBe(false);
        });
    });


});