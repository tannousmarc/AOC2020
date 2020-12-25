const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/25.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    const [card, door] = [data[0], data[1]].map(Number)

    let step = 0;
    let val = 1;
    while(val !== door){
        val *= 7;
        val %= 20201227;
        step ++;
    }
    console.log(step);
    val = 1;
    for(let i = 0; i < step; i++){
        val *= card;
        val %= 20201227;
    }
    console.log(val);
});