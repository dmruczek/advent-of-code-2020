const dataProcessor = require('./data-processor.js');


let isPasswordValid = function (entry) {

    return (entry.password.charAt(entry.from - 1) === entry.char || entry.password.charAt(entry.to - 1) === entry.char) 
    && entry.password.charAt(entry.from - 1) !== entry.password.charAt(entry.to - 1);
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

