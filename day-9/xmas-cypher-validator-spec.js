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
 
});