const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/17.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
   
    const countOccupied = mat => mat.flat().filter(elem => elem === '#').length;

    let matrix = [];
    matrix[0] = [];
    for(let i = 0; i < data.length; i++){
        data[i] = data[i].split("");
        matrix[0][i] = data[i];
    }
    console.log(matrix);
    const dirs = [[-1, -1, -1], [-1, -1, 0], [-1, -1, 1], [-1, 0, -1], [-1, 0, 0], [-1, 0, 1], [-1, 1, -1], [-1, 1, 0], [-1, 1, 1],
                  [0, 0, -1], [0, 0, 1], [0, 1, -1], [0, 1, 0], [0, 1, 1], [0, -1, -1], [0, -1, 0], [0, -1, 1],
                  [1, -1, -1], [1, -1, 0], [1, -1, 1], [1, 0, -1], [1, 0, 0], [1, 0, 1], [1, 1, -1], [1, 1, 0], [1, 1, 1]];
    
    let nextMatrix = utils.deepCloneArray(matrix);
    for(let z = )
        for(let i = 0; i < matrix.length; i++)
            for(let j = 0; j < matrix[0].length; j++){
                let count = 0;
                for(dir of dirs){
                    if(typeof matrix[z + dir[0]] === "undefined")
                        continue;
                    if(typeof matrix[z + dir[0]][i + dir[1]] === "undefined")
                        continue;
                    if(typeof matrix[z + dir[0]][i + dir[1]] === "undefined")
                        continue;
                    if(matrix[z + dir[0]][i + dir[1]] === '#')
                        count++;
                }
                if(matrix[z][i][j] === '.' && count === 3)
                    nextMatrix[z][i][j] = '#';
                else if(matrix[z][i][j] === '#' && (count === 2 || count === 3))
            }
    console.log(nextMatrix);
});