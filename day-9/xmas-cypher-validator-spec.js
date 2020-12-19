describe("XMASCypherValidator", function () {

    const XMASCypherValidator = require('./xmas-cypher-validator.js');

    describe("findFirstInvalidValue", function () {

        it("should properly identify the first invalid value", function () {
            const xmasCypherValidator = new XMASCypherValidator(5);
            xmasCypherValidator.loadCypherFromFile("test-input.txt");
            const firstInvalidValue = xmasCypherValidator.findFirstInvalidValue();
            expect(firstInvalidValue).toBe(127);
        });

    });

    describe("findEncryptionWeaknessRange", function () {

        it("should correctly find the encryption weakness range.", function () {
            const xmasCypherValidator = new XMASCypherValidator(5);
            xmasCypherValidator.loadCypherFromFile("test-input.txt");
            const encryptionWeaknessRange = xmasCypherValidator.findEncryptionWeaknessRange(127);
            expect(encryptionWeaknessRange).toEqual([15,25,47,40]);
        });

    });

    describe("findEncryptionWeakness", function () {

        it("should correctly find the encryption weakness range.", function () {
            const xmasCypherValidator = new XMASCypherValidator(5);
            xmasCypherValidator.loadCypherFromFile("test-input.txt");
            const encryptionWeakness = xmasCypherValidator.findEncryptionWeakness(127);
            expect(encryptionWeakness).toBe(62);
        });

    });
    
 
});