const BagRuleAnalyzer = require('./bag-rule-analyzer.js');
const bagRuleAnalyzer = new BagRuleAnalyzer();
bagRuleAnalyzer.processAllBagRules();
const validContainers = bagRuleAnalyzer.getValidContainersForBag('shiny gold');
console.log("Valid Containers:",validContainers);
console.log(validContainers.length, "unique bags.");