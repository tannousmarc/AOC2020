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

        const vals = Object.keys(matrix).map(coord => coord.split(",").map(val => Number(val)));
        for(let x = Math.min(...vals.map(val => val[0])) - 1; x < Math.max(...vals.map(val => val[0])) + 2; x++)
            for(let y = Math.min(...vals.map(val => val[1])) - 1; y < Math.max(...vals.map(val => val[1])) + 2; y++)
                for(let z = Math.min(...vals.map(val => val[2])) - 1; z < Math.max(...vals.map(val => val[2])) + 2; z++)
                    for(let t = Math.min(...vals.map(val => val[3])) - 1; t < Math.max(...vals.map(val => val[3])) + 2; t++){
                        let count = 0;

                        for([dx, dy, dz, dt] of utils.cartesianProduct([-1, 0, 1], [-1, 0, 1], [-1, 0, 1], [-1, 0, 1])){
                            if(dx == 0 && dy == 0 && dz == 0 && dt == 0)
                                continue;
                            else if(matrix[[x + dx, y + dy, z + dz, t + dt]] || false)
                                count++;
                        }

                        if((matrix[[x, y, z, t]] || false) && (count === 2 || count === 3) || 
                           (!(matrix[[x, y, z, t]] || false) && count === 3))
                            nextMatrix[[x, y, z, t]] = true;
                    }

        matrix = nextMatrix;
    }

    console.log(Object.values(matrix).reduce((t, n) => t + n));
});