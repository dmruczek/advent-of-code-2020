describe("CustomsFormProcessor", function () {

    const CustomsFormProcessor = require('./customs-form-processor.js');
    let customsFormProcessor = new CustomsFormProcessor(true);

    describe("processGroup", function () {

        it("should properly process a group (A)", function () {

            let groupData = `abc`;
            let processedGroup = customsFormProcessor.processGroup(groupData);
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
            let processedGroup = customsFormProcessor.processGroup(groupData);
            expect(processedGroup).toEqual({
                individualAnswers: ['a', 'b', 'c'],
                aggregateAnswers: 'abc',
                uniqueAnswerCount: 3
            });
        });

        it("should properly process a group (C)", function () {
            let groupData =
                `ab
ac`;
            let processedGroup = customsFormProcessor.processGroup(groupData);
            expect(processedGroup).toEqual({
                individualAnswers: ['ab', 'ac'],
                aggregateAnswers: 'abc',
                uniqueAnswerCount: 3
            });
        });

        it("should properly process a group (D)", function () {
            let groupData =
                `a
a
a
a`;
            let processedGroup = customsFormProcessor.processGroup(groupData);
            expect(processedGroup).toEqual({
                individualAnswers: ['a', 'a', 'a', 'a'],
                aggregateAnswers: 'a',
                uniqueAnswerCount: 1
            });
        });

        it("should properly process a group (E)", function () {
            let groupData = `b`;
            let processedGroup = customsFormProcessor.processGroup(groupData);
            expect(processedGroup).toEqual({
                individualAnswers: ['b'],
                aggregateAnswers: 'b',
                uniqueAnswerCount: 1
            });

        });

    });



});