const fs = require('fs');

function mul_inv(a, b){

    var b0 = b;
    var x0 = 0;
    var x1 = 1;
    var q, tmp;
    if( b== 1){
      return 1;
    }
    while(a>1){
      q = parseInt(a/b);
      tmp = a;
      a = b;
      b = tmp%b;
      tmp = x0;
      x0 = x1 - (q * x0);
      x1 = tmp;
    }
    if(x1 <0){
      x1 = x1+b0;
    }
    return x1;
  }
  
  function chineseRemainder(a, n){
    var p = i = prod = 1;
    var sm = 0;
    for(i=0; i< n.length; i++){
      prod = prod * n[i];
    }
    for(i=0; i< n.length; i++){
      p = prod / n[i];
      sm = sm + ( a[i] * mul_inv(p, n[i]) * p);
    }
    return sm % prod;
  }

  
fs.readFile('inputs/13.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');

    let buses = [];
    data[1] = data[1].split(/,/);
    for(elem of data[1]){
        buses.push(elem === 'x' ? 0 : Number(elem));
    }

    let a = [];
    let n = [];

    for(let i = 0; i < buses.length; i++){
        if(buses[i] === 0)
            continue;
        a.push(buses[i] - i);
        n.push(buses[i])
    }

    console.log(chineseRemainder(a, n));
});