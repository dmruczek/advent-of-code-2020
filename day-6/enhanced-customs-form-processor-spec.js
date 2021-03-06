describe("EnhancedCustomsFormProcessor", function () {

    const EnhancedCustomsFormProcessor = require('./enhanced-customs-form-processor.js');
    let enhancedCustomsFormProcessor = new EnhancedCustomsFormProcessor(true);

    describe("processGroup", function () {

        it("should properly process a group (A)", function () {

            let groupData = `abc`;
            let processedGroup = enhancedCustomsFormProcessor.processGroup(groupData);
            expect(processedGroup).toEqual({
                individualAnswers: ['abc'],
                aggregateAnswers: 'abc',
                uniqueAnswerCount: 3
            });
        });

        it("should properly process a group (B)", function () {

            let groupData =
                `a
b
c`;
            let processedGroup = enhancedCustomsFormProcessor.processGroup(groupData);
            expect(processedGroup).toEqual({
                individualAnswers: ['a', 'b', 'c'],
                aggregateAnswers: '',
                uniqueAnswerCount: 0
            });
        });

        it("should properly process a group (C)", function () {
            let groupData =
                `ab
ac`;
            let processedGroup = enhancedCustomsFormProcessor.processGroup(groupData);
            expect(processedGroup).toEqual({
                individualAnswers: ['ab', 'ac'],
                aggregateAnswers: 'a',
                uniqueAnswerCount: 1
            });
        });

        it("should properly process a group (D)", function () {
            let groupData =
                `a
a
a
a`;
            let processedGroup = enhancedCustomsFormProcessor.processGroup(groupData);
            expect(processedGroup).toEqual({
                individualAnswers: ['a', 'a', 'a', 'a'],
                aggregateAnswers: 'a',
                uniqueAnswerCount: 1
            });
        });

        it("should properly process a group (E)", function () {
            let groupData = `b`;
            let processedGroup = enhancedCustomsFormProcessor.processGroup(groupData);
            expect(processedGroup).toEqual({
                individualAnswers: ['b'],
                aggregateAnswers: 'b',
                uniqueAnswerCount: 1
            });

        });

    });


    describe("processGroup", function () {
        it("should correctly count all the answers", function () {
            expect(enhancedCustomsFormProcessor.countAllGroupAnswers()).toEqual(6);
        });
    });



});