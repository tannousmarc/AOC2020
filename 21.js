const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/21.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    
    let map = new Map();
    for(elem of data){
        elem = elem.split("").filter(char => char !== '(' && char !== ')').join("");
        elem = elem.split(/ |, /);
        let ingredients = new Set(elem.slice(0, elem.indexOf("contains")));
        let allergens = elem.slice(elem.indexOf("contains") + 1);

        allergens.forEach(allergen => {
            if(map.has(allergen))
                map.set(allergen, new Set([...map.get(allergen)].filter(x => ingredients.has(x))))
            else
                map.set(allergen, ingredients);
        });
    }
    
    const allergensNo = map.size;
    let found = 0;
    let realMap = new Map();
    while(found < allergensNo){
        for([key, val] of map){
            if(val.size === 1){
                const ingredient = val.values().next().value;
                realMap.set(ingredient, key);
                found++;
                for([key2, val2] of map)
                    if(val2.has(ingredient))
                        val2.delete(ingredient);
                map.delete(key);
            }
        }
    }
    
    console.log(realMap);
});