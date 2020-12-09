const fs = require('fs');

fs.readFile('inputs/08.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    // console.log(data);

    let op = [];
    let arg = [];
    for(let i = 0; i < data.length; i++){
        data[i] = data[i].match(/(nop|acc|jmp)\s([\+-]\d+)/);
        [op[i], arg[i]] = [data[i][1], data[i][2]];
    }

    for(let i = 0; i < op.length; i++){
        let sum = 0;
        let thisWasIt = true;
        let exec = new Array(op.length + 1).fill(false);

        if(op[i] === "nop")
            op[i] = "jmp";
        else if(op[i] === "jmp")
            op[i] = "nop";

        let j = 0;
        while(j < op.length){
            if(exec[j]){
                thisWasIt = false;
                break;
            }
            exec[j] = true;
            switch (op[j]){
                case "nop":
                    j++;
                    break;
                case "acc":
                    sum += arg[j][0] === '+' ? Number(arg[j].substring(1)) : -Number(arg[j].substring(1));
                    j++;
                    break;
                case "jmp":
                    j += arg[j][0] === '+' ? Number(arg[j].substring(1)) : -Number(arg[j].substring(1));
                    break;
            }
        }

        if(op[i] === "nop")
            op[i] = "jmp";
        else if(op[i] === "jmp")
            op[i] = "nop";

        if(thisWasIt){
            console.log(j + " " + sum);
            return;
        }
    }

});