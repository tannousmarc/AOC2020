const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/11.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    const countOccupied = mat => mat.flat().filter(elem => elem === '#').length;

    const occupiedNextTo = (prevStep, i, j) => {
        let count = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [0, -1], [1, -1], [1, 0], [1, 1]];
        for(dir of dirs){
            let go = true;
            let multiplier = 1;
            while(go){
                if(typeof prevStep[i + dir[0] * multiplier] === "undefined")
                    go = false;
                else if(typeof prevStep[i + dir[0] * multiplier][j + dir[1] * multiplier] === "undefined")
                    go = false;
                else if(prevStep[i + dir[0] * multiplier][j + dir[1] * multiplier] === '#'){
                    count++;
                    go = false;
                }
                else if(prevStep[i + dir[0] * multiplier][j + dir[1] * multiplier] === 'L')
                    go = false;
                    
                multiplier ++;
            }
        }
        return count;
    }

    let currStep = [];
    let prevStep = [];
    for(let i = 0; i < data.length; i++){
        currStep[i] = data[i].split("");
    }

    do{
        prevStep = utils.deepCloneArray(currStep);
        for(let i = 0; i < prevStep.length; i++)
            for(let j = 0; j < prevStep[i].length; j++){
                if(prevStep[i][j] === 'L' && occupiedNextTo(prevStep, i, j) === 0)
                    currStep[i][j] = '#';
                else if(prevStep[i][j] === '#' && occupiedNextTo(prevStep, i, j) >= 5)
                    currStep[i][j] = 'L';
            }
    }
    while (!utils.arraysEqual(prevStep, currStep));

    console.log(countOccupied(currStep));
});