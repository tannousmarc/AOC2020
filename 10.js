const fs = require('fs');

fs.readFile('inputs/10.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    adapters = [0];
    for(elem of data){
        elem = Number(elem);
        adapters.push(elem);
    }

    adapters.sort((a, b) => a-b);
    adapters.push(adapters[adapters.length - 1] + 3);
    
    let onejolts = 0;
    let threejolts = 0;
    for(let i = 1; i < adapters.length; i++){
        if(adapters[i] - adapters[i-1] === 1)
            onejolts++;
        else if(adapters[i] - adapters[i-1] === 3)
            threejolts++;
    }
    console.log(onejolts * threejolts);

    let waysToGetTo = new Array(adapters.length + 1).fill(0);
    waysToGetTo[0] = 1;
    for(let i = 1; i < adapters.length; i++)
        for(let j = 0; j < i; j++)
            waysToGetTo[i] = adapters[i] - adapters[j] <= 3 ? waysToGetTo[i] + waysToGetTo[j] : waysToGetTo[i];

    console.log(waysToGetTo[adapters.length - 1]);
});