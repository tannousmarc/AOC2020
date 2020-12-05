const fs = require('fs');

fs.readFile('inputs/05.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    let seats = [];
    for(ticket of data){
        const vertical = parseInt(ticket.substring(0,7).split('').map(letter => letter === 'F' ? '0' : '1').join(""), 2);
        const horizontal = parseInt(ticket.substring(7).split('').map(letter => letter === 'L' ? '0' : '1').join(""), 2);
        seats.push(8 * vertical + horizontal);
    }

    seats = seats.sort(function(a, b) {
        return a - b;
    });

    // figure it out from output: discard outliers at each end, in the middle there should be (a, b) with b = a + 2. Result is a + 1.
    for(let i = 1; i < seats.length; i++){
        if(seats[i] === seats[i-1] + 1 && seats[i] === seats[i+1] -1)
            continue;
        console.log(seats[i]);
    }
});
