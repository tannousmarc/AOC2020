const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/20.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n\n');

    let tiles = {};
    let seenEdges = new Map();
    for(elem of data){
        elem = elem.split('\n');
        const tileNo = elem[0].substring(5, elem[0].length - 1);
        const tile = elem.slice(1);
        let edges = [];
        // top
        edges.push(tile[0], tile[0].split("").reverse().join(""));
        // bottom
        edges.push(tile[tile.length - 1], tile[tile.length - 1].split("").reverse().join(""));
        // left
        edges.push(tile.map(row => row[0]).join(""), tile.map(row => row[0]).reverse().join(""));
        // right
        edges.push(tile.map(row => row[row.length - 1]).join(""), tile.map(row => row[row.length - 1]).reverse().join(""));
        tiles[tileNo] = {
            tile: tile,
            edges: edges,
            noEdgesBorder: 0
        };
 
        edges.forEach(edge => seenEdges.set(edge, seenEdges.has(edge) ? seenEdges.get(edge) + 1 : 1));
    }

    let res = 1;
    for(key in tiles){
        for(edge of tiles[key].edges)
            if(seenEdges.get(edge) + seenEdges.get(edge.split("").reverse().join("")) > 2)
                tiles[key].noEdgesBorder++
        if(tiles[key].noEdgesBorder === 4)
            res *= key;
    }
    console.log(res);
});