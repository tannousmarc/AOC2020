const fs = require('fs');

fs.readFile('inputs/02.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    let res = 0;
    for(row of data){
        row = row.split('-');
        row[1] = row[1].split(' ');
        row = row.flat();
        row[2] = row[2][0];

        let count = 0;
        if(row[3][Number(row[0]) - 1] == row[2])
            count++;
        if(row[3][Number(row[1]) - 1] == row[2])
            count++;
        
        if(count == 1)
            res++;
    }
    console.log(res);
});