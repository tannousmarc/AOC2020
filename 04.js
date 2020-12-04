const fs = require('fs');

fs.readFile('inputs/04.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n\n');
    
    let res = 0;
    for(passport of data){
        passport = passport.split(/\n| /);

        const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
        let validFields = 0;
        const removeAndIncrement = () => {
            required.splice(required.indexOf(field.substring(0, 3)), 1);
            validFields++;
        }

        for(field of passport){
            const key = required[required.indexOf(field.substring(0, 3))];

            if(key !== -1){
                const val = field.substring(4);

                switch(key) {
                    case 'byr':
                        if(/^19[2-9][0-9]$|^200[0-2]$/.test(val))
                            removeAndIncrement();
                        break;
                    case 'iyr':
                        if(/^201[0-9]$|^2020$/.test(val))
                            removeAndIncrement();
                        break;
                    case 'eyr':
                        if(/^202[0-9]$|^2030$/.test(val))
                            removeAndIncrement();
                        break;
                    case 'hgt':
                        if(/^(1[5-8][0-9]|19[0-3])cm$|^(59|6[0-9]|7[0-6])in$/.test(val))
                            removeAndIncrement();
                        break;
                    case 'hcl':
                        if(/^#[a-f0-9]{6}$/.test(val))
                            removeAndIncrement();
                        break;
                    case 'ecl':
                        if(/^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$/.test(val))
                            removeAndIncrement();
                        break;
                    case 'pid':
                        if(/^[0-9]{9}$/.test(val))
                            removeAndIncrement();
                        break;
                }
            }
        }
        if(validFields === 7)
            res++;
    }
    console.log(res);
});