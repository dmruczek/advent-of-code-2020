const CustomsFormProcessor = require('./customs-form-processor.js');
const customsFormProcessor = new CustomsFormProcessor();
console.log('Total Answers:', customsFormProcessor.countAllGroupAnswers());
