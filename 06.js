const fs = require('fs');

fs.readFile('inputs/06.txt', 'utf8', (err, data) => {
    if(err) throw err;
    groups = data.split('\n\n');
    
    let sum = 0;
    for(group of groups){
        group = group.split('\n');

        let vals = new Array(26).fill(0);
        group.map(elem => 
            elem.split("").map(letter =>
                 vals[letter.charCodeAt(0) - 'a'.charCodeAt(0)]++
                )
            );
        
        vals.map(val =>
            val === group.length ? sum++ : null
        );
    }
    console.log(sum);
});