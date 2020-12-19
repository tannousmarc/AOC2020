const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/19.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n');
    data.push("8: 42 | 42 8");
    data.push("11: 42 31 | 42 11 31");

    let rules = {}, terminals = {};
    let texts = [];
    for(elem of data){
        if(elem.indexOf(":") !== -1){
            elem = elem.split(": ");
            if(elem[1].indexOf("\"") !== -1)
                terminals[elem[0]] = elem[1].substring(1, elem[1].length -1);
            else
                rules[elem[0]] = elem[1].split(" | ").map(rule => rule.split(" "));
        }
        else if(elem.length > 0)
            texts.push(elem);
    }

    let memo = {};
    const parse = (text, left, right, rule) => {
        if (!([text, left, right, rule] in memo)){
            if(rule in terminals)
                memo[[text, left, right, rule]] = text.substring(left, right) === terminals[rule];
            else 
                memo[[text, left, right, rule]] = rules[rule].some(branch => applicative(text, left, right, branch));
        }

        return memo[[text, left, right, rule]];
    }
    const applicative = (text, left, right, rule) => {
        if(left === right && rule.length === 0)
            return true;
        else if(rule.length === 0 || left === right)
            return false;

        for(let breakpoint = left + 1; breakpoint <= right; breakpoint++)
            if(parse(text, left, breakpoint, rule[0]) && applicative(text, breakpoint, right, rule.slice(1, rule.length)))
                return true;
        return false;
    }

    let res = 0;
    for(text of texts)
        res += parse(text, 0, text.length, '0');
    console.log(res);
});