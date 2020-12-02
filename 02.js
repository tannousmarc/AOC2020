const fs = require('fs');

fs.readFile('inputs/02.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    const regex = /(\d+)-(\d+) ([a-z]): ([a-z]+)/

    let res = 0;
    for(row of data){
        matches = regex.exec(row);

        let count = 0;
        if(matches[4][Number(matches[1]) - 1] == matches[3])
            count++;
        if(matches[4][Number(matches[2]) - 1] == matches[3])
            count++;

        if(count == 1)
            res++;
    }
    console.log(res);
});