const fs = require('fs');

fs.readFile('inputs/test.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    console.log(data);
});