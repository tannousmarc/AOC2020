const fs = require('fs');

fs.readFile('inputs/01.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    map = new Map();
    // fuck 3sum on day 1, just brute force it 🙄
    for(value1 of data){
        for(value2 of data){
            // this misses the edge case where the solution contains two identical values
            // to fix that, instead of the lazy for ... of loop, just use indexes 🙄
            if(value1 == value2)
                continue;
            map.set(2020 - value1 - value2, value1 * value2)
        }
    }

    for(value of data)
        if(map.has(Number(value))){
            console.log(Number(value) * map.get(Number(value)))
            return;
        }
});