const dataProcessor = require('./data-processor.js');


let isPasswordValid = function (entry) {

    let charCount = 0;
    for (let i = 0; i < entry.password.length; i++) {
        if (entry.password.charAt(i) === entry.char) {
            charCount++;
        }
    }

    return (charCount >= entry.from && charCount <= entry.to);
}


let countValidPasswords = function () {
    const allEntries = dataProcessor.getData();

    let numCorrectPasswords = 0;
    for (let i = 0; i < allEntries.length; i++) {
        if (isPasswordValid(allEntries[i])) {
            numCorrectPasswords++;
        }
    }
    return numCorrectPasswords;
}


console.log(countValidPasswords());

