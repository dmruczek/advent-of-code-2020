const EnhancedCustomsFormProcessor = require('./enhanced-customs-form-processor.js');
const enhancedCustomsFormProcessor = new EnhancedCustomsFormProcessor();
console.log('Total Answers:', enhancedCustomsFormProcessor.countAllGroupAnswers());
