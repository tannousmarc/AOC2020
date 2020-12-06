const { group } = require('console');
const fs = require('fs');

fs.readFile('inputs/06.txt', 'utf8', (err, data) => {
    if(err) throw err;
    groups = data.split('\n\n');

    let sum = 0;
    // group is a constant
    for(groupx of groups){
        groupx = groupx.split('\n');

        let vals = new Array(26).fill(0);

        for(elem of groupx)
            for(letter of elem)
                vals[letter.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        
        for(val of vals)
            if(val === groupx.length)
                sum++;
    }
    console.log(sum);
});