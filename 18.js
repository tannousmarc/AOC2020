const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/18.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    let sum = 0;
    for(elem of data){
        elem = elem.split(" ").join("");

        let vals = [];
        let ops = [];

        const step = () => {
            const operator = ops[0];
            ops.splice(0, 1);
            const [a, b] = [vals[0], vals[1]];
            vals.splice(0, 2);
            vals.unshift(operator === '+' ? a + b : a * b);
        }

        for(tok of elem){
            if(tok >= '0' && tok <= '9')
                vals.unshift(Number(tok));
            else if(tok === '(')
                ops.unshift(tok);
            else if(tok === ')'){
                while(ops[0] !== '(')
                    step();
                ops.splice(0, 1);
            }
            else{
                while(ops.length > 0 && ops[0] !== '(' && !(ops[0] === '*' && tok === '+'))
                    step();
                ops.unshift(tok);
            }
        }

        while(ops.length > 0)
            step();

        sum += vals[0];
    }

    console.log(sum);
});