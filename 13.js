const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/13.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    let buses = [];
    data[1] = data[1].split(/,/);
    for(elem of data[1])
        buses.push(elem === 'x' ? 0 : Number(elem));

    let a = [];
    let n = [];

    for(let i = 0; i < buses.length; i++){
        if(buses[i] === 0)
            continue;
        a.push(buses[i] - i);
        n.push(buses[i])
    }

    console.log(utils.CRT(a, n));
});