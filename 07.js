const fs = require('fs');

fs.readFile('inputs/07.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    let map = new Map();
for(elem of data){
    elem = elem.split(/, | contain |\./);
    elem[0] = elem[0].slice(0, -1);
    map.set(elem[0], elem.slice(1, -1));
}

    let set = new Set();
    const performSearch = (search) => {
        map.forEach((value, key) => {
            if(value.join("").includes(search)){
                set.add(key);
                performSearch(key);
            }
        });
    } 
    performSearch('shiny gold bag');
    console.log(set.size);

    let sum = 0;
    const performSum = (search, quant) => {
        for(value of map.get(search)){
            if(value === "no other bags")
                break;

            value = value.split(" ");
            sum += quant * Number(value[0]);
            performSum(value[1] + " " + value[2] + " bag", quant * Number(value[0]));
        }
    }
    performSum('shiny gold bag', 1);
    console.log(sum);
});