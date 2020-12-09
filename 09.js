const fs = require('fs');

fs.readFile('inputs/09.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n').map(elem => Number(elem));

    const sumOfTwo = (queue, elem) => {
        for(let i = 0; i < queue.length; i++)
            if(queue.includes(elem - queue[i]))
                return true;
        return false;
    }

    const contiguousSum = (queue, elem) => {
        for(let i = 0; i < queue.length ; i++){
            let j = 0;
            let sum = 0;

            while(sum <= elem){
                sum += queue[i + j];
                if(sum === elem){
                    queue = queue.slice(i, i+j);
                    queue.sort((a, b) => a-b);
                    return queue[0] + queue[j - 1];
                }
                j++;
            }
        }
    }

    let impostor = 0;
    let queue = [];

    for(elem of data){
        if(queue.length > 24){
            if(!sumOfTwo(queue, elem)){
                impostor = elem;
                break;
            }
            queue.shift();
        }
        queue.push(elem);
    }

    console.log(impostor);
    console.log(contiguousSum(data, impostor));
});