const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/16.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n\n');
    
    let yourTicket;
    let nearbyTickets;
    let rules = [];
    for(elem of data){
        elem = elem.split('\n');
        if(elem[0] === "your ticket:")
            yourTicket = elem[1].split(',').map(val => Number(val));
        else if(elem[0] === "nearby tickets:")
            nearbyTickets = elem.slice(1).map(row => row.split(',').map(val => Number(val)));
        else{
            elem = elem.map(row => row.split(' ').map(rule => rule.split('-')));
            for(row of elem){
                rules.push([Number(row[1][0]), Number(row[1][1])]); 
                rules.push([Number(row[3][0]), Number(row[3][1])]);
            }
        }
    }
    
    let res = 0;
    let possibleRules = [];
    for(let i = 0; i < nearbyTickets.length; i++)
        for(val of nearbyTickets[i]){
            let flag = false;
            for(rule of rules)
                if(val >= rule[0] && val <= rule[1]){
                    flag = true;
                    break;
                }
            if(!flag)
                nearbyTickets[i] = []
        }

    for(ticket of nearbyTickets)
        for(let i = 0; i < ticket.length; i++){
            for(let j = 0; j < rules.length; j++)
                if(ticket[i] >= rules[j][0] && ticket[i] <= rules[j][1]){
                    if(!possibleRules[i])
                        possibleRules[i] = [];
                    possibleRules[i].push(parseInt(j / 2));
                }
        }

    let index = 0;

    for(rule of possibleRules){
        let counts = {};
        for(val of rule)
            counts[val] = counts[val] ? counts[val] + 1 : 1;
        console.log(index);
        console.log(counts);
        index++;
    }
});