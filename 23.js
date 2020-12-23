const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/23.txt', 'utf8', (err, data) => {
    if(err) throw err;
    let cups = data.split('').map(Number);
    for(let i = 10; i <= 1000000; i++)
        cups.push(i);

    const sortedCups = utils.deepCloneArray(cups).sort((a, b) => a - b);
    const lookupTable = new Map();
    cups = cups.map(val => ({ val: val }));
    cups.forEach((_, index) => {
        cups[index].next = cups[(index + 1) % cups.length];
        lookupTable.set(cups[index].val, cups[index]);
    });

    let head = cups[0];
    for(let turn = 0; turn < 10000000; turn++){
        const pickedUp = [head.next.val, head.next.next.val, head.next.next.next.val];
        const placeToInsert = head.next;
        head.next = head.next.next.next.next;
        let destination = head.val - 1;

        let found = false;
        while(!found){
            while(pickedUp.indexOf(destination) !== -1) 
                destination--;
            destination = destination < sortedCups[0] ? sortedCups[sortedCups.length - 1] : destination;
            while(pickedUp.indexOf(destination) !== -1) 
                destination--;

            if(lookupTable.has(destination)){
                placeToInsert.next.next.next = lookupTable.get(destination).next;
                lookupTable.get(destination).next = placeToInsert;
                found = true;
            }
        }
        head = head.next;
    }
    console.log(lookupTable.get(1));
});