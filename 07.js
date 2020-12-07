const fs = require('fs');

fs.readFile('inputs/07.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    let map = new Map();
    for(elem of data){
        elem = elem.split(/, | contain |\./);
        elem.splice(-1);
        elem[0] = elem[0].slice(0, -1);

        for(let i = 1; i < elem.length; i++)
            map.set(elem[0], map.has(elem[0]) ? [map.get(elem[0])].concat(elem[i]).flat() : elem[i]);
    }

    let set = new Set();
    const performSearch = (search) => {
        map.forEach((value, key) => {
            if(Array.isArray(value))
                value = value.join("");

            if(value.includes(search)){
                set.add(key);
                performSearch(key);
            }
        });
    } 
    performSearch('shiny gold bag');
    console.log(set.size);

    let sum = 0;
    const performSum = (search, quant) => {
        let mapGet = map.get(search);
        if(!Array.isArray(mapGet))
            mapGet = [mapGet];

        for(val of mapGet){
            if(val === "no other bags")
                break;

            val = val.split(" ");
            sum += quant * Number(val[0]);
            performSum(val[1] + " " + val[2] + " bag", quant * Number(val[0]));
        }
    }
    performSum('shiny gold bag', 1);
    console.log(sum);
});