const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/12.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    const dirs = ["E", "S", "W", "N"];

    let facing = "E";
    let pos = [0, 0];
    let wPos = [10, 1];

    for(elem of data){
        switch (elem[0]){
            case "N":
                wPos[1] += Number(elem.substring(1));
                break;
            case "S":
                wPos[1] -= Number(elem.substring(1));
                break;
            case "E":
                wPos[0] += Number(elem.substring(1));
                break;
            case "W":
                wPos[0] -= Number(elem.substring(1));
                break;
            case "R":
                for(let i = 0; i < Number(elem.substring(1)) / 90; i++)
                    wPos = utils.rotateRight(wPos);
                break;
            case "L":
                for(let i = 0; i < Number(elem.substring(1)) / 90; i++)
                    wPos = utils.rotateLeft(wPos);
                break;
            case "F":
                pos[1] += Number(elem.substring(1)) * wPos[1];
                pos[0] += Number(elem.substring(1)) * wPos[0];
            break;
        }
    }
    console.log(pos);
});