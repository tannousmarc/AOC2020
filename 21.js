const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/21.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    
    let map = new Map();
    for(elem of data){
        elem = elem.replace(/\(|\)/g, "");
        elem = elem.split(/ |, /);
        let ingredients = new Set(elem.slice(0, elem.indexOf("contains")));
        let allergens = elem.slice(elem.indexOf("contains") + 1);

        allergens.forEach(allergen => map.set(allergen, map.has(allergen) ? new Set([...map.get(allergen)].filter(x => ingredients.has(x))) : ingredients));
    }
    
    const allergensNo = map.size;
    let found = 0;
    let realMap = new Map();

    while(found < allergensNo)
        for([key, val] of map)
            if(val.size === 1){
                const ingredient = val.values().next().value;
                realMap.set(ingredient, key);
                map.delete(key);
                found++;
                for([_, val2] of map)
                    if(val2.has(ingredient))
                        val2.delete(ingredient);
            }
    
    console.log(realMap);
});