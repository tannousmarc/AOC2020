const fs = require('fs');

fs.readFile('inputs/04.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n\n');
    
    let res = 0;
    for(passport of data){
        passport = passport.split(/\n| /);

        const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

        let validFields = 0;
        for(field of passport){
            const key = required[required.indexOf(field.substring(0, 3))];

            if(key !== -1){
                let val = field.substring(4);

                switch(key) {
                    case 'byr':
                        if(Number(val) >= 1920 && Number(val) <= 2002 && val.length === 4){
                            required.splice(required.indexOf(field.substring(0, 3)), 1);
                            validFields++;
                        }
                        break;
                    case 'iyr':
                        if(Number(val) >= 2010 && Number(val) <= 2020 && val.length === 4){
                            required.splice(required.indexOf(field.substring(0, 3)), 1);
                            validFields++;
                        }
                        break;
                    case 'eyr':
                        if(Number(val) >= 2020 && Number(val) <= 2030 && val.length === 4){
                            required.splice(required.indexOf(field.substring(0, 3)), 1);
                            validFields++;
                        }
                        break;
                    case 'hgt':
                        const standard = field.slice(-2);
                        val = val.substring(0, val.length - 2);
                        if(standard === 'cm' && Number(val) >= 150 && Number(val) <= 193){
                            required.splice(required.indexOf(field.substring(0, 3)), 1);
                            validFields++;
                        }
                        else if(standard === 'in' && Number(val) >= 59 && Number(val) <= 76){
                            required.splice(required.indexOf(field.substring(0, 3)), 1);
                            validFields++;
                        }
                        break;
                    case 'hcl':
                        const first = val.substring(0, 1);
                        const rest = val.substring(1);
                        if(first === '#' && /[a-f0-9]{6}/.test(rest)){
                            required.splice(required.indexOf(field.substring(0, 3)), 1);
                            validFields++;
                        }
                        break;
                    case 'ecl':
                        const valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
                        if(valid.indexOf(val) !== -1){
                            required.splice(required.indexOf(field.substring(0, 3)), 1);
                            validFields++;
                        }
                        break;
                    case 'pid':
                        if(parseInt(val, 10) <= 999999999 && val.length === 9){
                            required.splice(required.indexOf(field.substring(0, 3)), 1);
                            validFields++;
                        }
                        break;
                    }
            }
        }
        if(validFields === 7)
            res++;
    }
    console.log(res);
});