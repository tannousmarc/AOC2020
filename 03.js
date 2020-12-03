const fs = require('fs');

fs.readFile('inputs/03.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    let [xPos, yPos] = [0, 0];
    const yOffset = 2;
    const xOffset = 1;
    let res = 0;

    while(yPos + yOffset < data.length){
        xPos = xPos + xOffset;
        yPos = yPos + yOffset;
        if(data[yPos][xPos  % data[0].length] === '#')
            res++;
    }

    console.log(res);
});