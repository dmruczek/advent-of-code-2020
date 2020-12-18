const PassportValidator = require('./enhanced-passport-validator.js');

var passportValidator = new PassportValidator();
passportValidator.validateAllPassports();
console.log('Valid Passports:  ' + passportValidator.validPassports);