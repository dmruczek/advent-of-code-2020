const XMASCypherValidator = require('./xmas-cypher-validator.js');
const xmasCypherValidator = new XMASCypherValidator(25);
xmasCypherValidator.loadCypherFromFile('input.txt');
const firstInvalidValue = xmasCypherValidator.findFirstInvalidValue();
console.log("First invalid value:", firstInvalidValue);
const encryptionWeakness = xmasCypherValidator.findEncryptionWeakness(firstInvalidValue);
console.log("Encryption weakness:", encryptionWeakness);
