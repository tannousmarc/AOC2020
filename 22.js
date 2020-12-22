const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/22.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n\n');

    const getScore = (deck) => deck.reduce((res, val, index) => res + val * (deck.length - index), 0);
    let [deck1, deck2] = [data[0].split('\n').slice(1).map(Number), data[1].split('\n').slice(1).map(Number)];

    const fight = (deck1, deck2 ) => {
        let rounds = new Set();
        while(deck1.length > 0 && deck2.length > 0){
            if (rounds.has(JSON.stringify(deck1.concat([' '].concat(deck2)))))
                return 0;
            rounds.add(JSON.stringify(deck1.concat([' '].concat(deck2))));

            const [card1, card2] = [deck1.shift(), deck2.shift()];
            if(deck1.length >= card1 && deck2.length >= card2)
                if(fight(utils.deepCloneArray(deck1.slice(0, card1)), utils.deepCloneArray(deck2.slice(0, card2))) === 0)
                    deck1.push(card1, card2);
                else
                    deck2.push(card2, card1);
            else if(card1 > card2)
                deck1.push(card1, card2);
            else
                deck2.push(card2, card1);
        }
        return deck1.length > 0 ? 0 : 1;
    }

    fight(deck1, deck2);
    console.log([getScore(deck1), getScore(deck2)]);
});