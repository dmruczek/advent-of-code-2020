describe("BagRuleAnalyzer", function () {

    const BagRuleAnalyzer = require('./bag-rule-analyzer.js');
    let bagRuleAnalyzer;

    beforeEach(function() {
        bagRuleAnalyzer = new BagRuleAnalyzer(true);
    });

    describe("decodeBagRule", function () {

        it("should properly decode bag rule data", function () {
            const bagRule = bagRuleAnalyzer.decodeBagRule('light red bags contain 1 bright white bag, 2 muted yellow bags.');
            const expected = {
                container: 'light red',
                contains: [
                    { quantity: 1, bag: 'bright white' },
                    { quantity: 2, bag: 'muted yellow' }
                ]
            };
            expect(bagRule).toEqual(expected);
        });

        it("should properly decode bag rules that contain no other bags", function () {
            const bagRule = bagRuleAnalyzer.decodeBagRule('faded blue bags contain no other bags.');
            const expected = {
                container: 'faded blue',
                contains: []
            };
            expect(bagRule).toEqual(expected);
        });

    });


    describe("getValidContainersForBag", function () {

        it("should properly identify valid containers", function () {
            bagRuleAnalyzer.processAllBagRules();
            const validContainers = bagRuleAnalyzer.getValidContainersForBag('shiny gold');

            expect(validContainers.length).toBe(4);
            expect(validContainers.includes('bright white')).toBe(true);
            expect(validContainers.includes('muted yellow')).toBe(true);
            expect(validContainers.includes('dark orange')).toBe(true);
            expect(validContainers.includes('light red')).toBe(true);

        });

    });

    describe("computeBagCost", function () {

        it("should compute the cost of a bag correctly for test-input.txt", function () {
            bagRuleAnalyzer.processAllBagRules();
            let cost = bagRuleAnalyzer.computeBagCost('shiny gold');
            expect(cost).toBe(32);
        });

        it("should compute the cost of a bag correctly for test-input-2.txt", function () {
            bagRuleAnalyzer.parseData('test-input-2.txt');
            bagRuleAnalyzer.processAllBagRules();
            let cost = bagRuleAnalyzer.computeBagCost('shiny gold');
            expect(cost).toBe(126);
        });

    });

    

});