const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/24.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    
    const dirMap = {
        'ne': [0, -1],
        'nw': [-1, -1],
        'se': [1, 1],
        'sw': [0, 1],
        'e':  [1, 0],
        'w':  [-1, 0]
    };

    let space = {};
    for(tile of data){
        const coords = [...tile.matchAll(/e|w|se|sw|ne|nw/g)].map(match => match[0]);
        let [x, y] = [0, 0];
        coords.forEach(coord => [x, y] = [x + dirMap[coord][0], y + dirMap[coord][1]]);
        space[[x, y]] = space[[x, y]] ? !space[[x,y]] : true;
    }
    console.log(Object.entries(space).reduce((sum, [_, val]) => sum + val, 0));

    const neighbours = Object.entries(dirMap).map(([_, val]) => val);
    for(let step = 0; step < 100; step++){
        let newSpace = {};
        let newNeighbours = {};
        for([pos, val] of Object.entries(space)){
            pos = pos.split(',').map(Number);
            let adj = 0;
            for([x, y] of neighbours){
                adj += space[[pos[0] + x, pos[1] + y]] ? space[[pos[0] + x, pos[1] + y]] : 0;
                if(typeof space[[pos[0] + x, pos[1] + y]] === 'undefined')
                    newNeighbours[[pos[0] + x, pos[1] + y]] = false;
            }
            if(val && (adj === 0 || adj > 2))
                newSpace[[pos[0], pos[1]]] = false;
            else if(!val && adj === 2)
                newSpace[[pos[0], pos[1]]] = true;
            else
                newSpace[[pos[0], pos[1]]] = space[[pos[0], pos[1]]];
        }

        for([pos, val] of Object.entries(newNeighbours)){
            pos = pos.split(',').map(Number);
            let adj = 0;
            for([x, y] of neighbours)
                adj += space[[pos[0] + x, pos[1] + y]] ? space[[pos[0] + x, pos[1] + y]] : 0;
            if(!val && adj === 2)
                newSpace[[pos[0], pos[1]]] = true;
        }
        space = newSpace;
    }
    console.log(Object.entries(space).reduce((sum, [_, val]) => sum + val, 0));
});