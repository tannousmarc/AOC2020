const fs = require('fs');
const utils = require('./utils');

const backtracking =  (place, inters = []) => {
    place = place.split("");

    if (place.indexOf("X") === -1)
      return place.join("").concat(inters);
  
    let one = utils.deepCloneArray(place);
    let zero = utils.deepCloneArray(place);
    one[place.indexOf("X")] = '1';
    zero[place.indexOf("X")] = '0';
    one = one.join("");
    zero = zero.join("");
    
    return inters.concat(backtracking(one), backtracking(zero));
};

fs.readFile('inputs/14.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    
    let mask;
    let mem = new Map();
    for(let i = 0; i < data.length; i++){
        if(data[i].includes("mask"))
            mask = data[i].substring(7);
        else{
            let place = Number(data[i].split(/\[|\]|\=/)[1]);
            let value = Number(data[i].split(/\[|\]|\=/)[3].substring(1));

            place = place.toString(2);
            place = (place.length < 36) ? place = Array(36 - place.length + 1).join("0") + place : place;
            place = place.split("");
            
            for(let j = 0; j < mask.length; j++)
                if(mask[j] === 'X' || mask[j] === '1')
                    place[j] = mask[j];

            place = place.join("");

            let inters = backtracking(place);
            for(inter of inters)
              mem.set(parseInt(inter, 2), value);
        }
    }

    let sum = 0;
    mem.forEach(val => sum += val);
    console.log(sum);
});