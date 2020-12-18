const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/17.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    let matrix = {};
    for(let i = 0; i < data.length; i++)
        for(let j = 0; j < data[i].length; j++)
            matrix[[i, j, 0, 0]] = data[i][j] === '#'
    
    for(let i = 0; i < 6; i++){
        let nextMatrix = {};
        console.log(Object.keys(matrix)[0])
    }
});