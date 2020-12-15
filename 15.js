const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/15.txt', 'utf8', (err, data) => {
    if(err) throw err;
    
    let counter = 0;
    let map = new Map();
    let last;
    data = data.split(',');
    for(elem of data){
        map.set(Number(elem), [counter]);
        last = Number(elem);
        counter++;
    }

    while(counter < 30000000){
        if(map.get(last).length < 2){
            map.set(0, [counter, map.get(0)[0]]);
            last = 0;
        }
        else{
            last = map.get(last)[0] - map.get(last)[1];
            if(map.has(last))
                map.set(last, [counter, map.get(last)[0]]);
            else
                map.set(last, [counter]);
        }
        counter++;
    }
    console.log(last);
});