const fs = require('fs');

fs.readFile('inputs/03.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    let pos = [0, 0];
    const yOffset = 2;
    const xOffset = 1;
    let res = 0;

    while(pos[1] + yOffset < data.length){
        pos[0] = pos[0] + xOffset;
        pos[1] = pos[1] + yOffset;
        if(data[pos[1]][pos[0]  % data[0].length] === '#')
            res++;
    }

    console.log(res);
});