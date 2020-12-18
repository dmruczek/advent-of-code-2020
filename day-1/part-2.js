const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf-8');
let numberList = data.split('\n').map(x => parseInt(x));

function computeResult() {
    for (let i = 0; i < numberList.length; i++) {
        for (let j = 0; j < numberList.length; j++) {
            if (i == j) {
                // skip.
            } else {

                for (let k = 0; k < numberList.length; k++) {
                    if ((i == k) || (j == k)) {
                        // skip.
                    } else {
                        if (numberList[i] + numberList[j] + numberList[k] === 2020) {
                            console.log(numberList[i] + " and " + numberList[j] + " and " + numberList[k]);
                            console.log('multiplied: ' + (numberList[i] * numberList[j] * numberList[k]));
        
                            return;
                        }
                    }
                }
            }
        }
    }
}

computeResult();