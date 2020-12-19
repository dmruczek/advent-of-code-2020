const BagRuleAnalyzer = require('./bag-rule-analyzer.js');
const bagRuleAnalyzer = new BagRuleAnalyzer();
bagRuleAnalyzer.processAllBagRules();
const cost = bagRuleAnalyzer.computeBagCost('shiny gold');
console.log("Bag Cost:", cost);
