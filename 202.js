const fs = require('fs');
const utils = require('./utils');

fs.readFile('inputs/20.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\n\n');

    let tiles = {};

    const getEdges = (tile) => {
        return {
            top: tile[0],
            bottom: tile[tile.length - 1],
            left: tile.map(row => row[0]).join(""),
            right: tile.map(row => row[row.length - 1]).join(""),
            topR: tile[0].split("").reverse().join(""),
            bottomR: tile[tile.length - 1].split("").reverse().join(""),
            leftR: tile.map(row => row[0]).reverse().join(""),
            rightR: tile.map(row => row[row.length - 1]).reverse().join("")
        }
    }
    
    const correctTile = (tile) => {
        const edges = getEdges(tile);
        return {
            tile: tile,
            edges: Object.entries(edges).map(elem => elem[1]),
            ...edges
        }
    }

    for(elem of data){
        elem = elem.split('\n');
        const tileNo = elem[0].substring(5, elem[0].length - 1);
        const tile = elem.slice(1);
        tiles[tileNo] = correctTile(tile);
    }

    const trimBorders = (tile) => {
        tile = tile.slice(1, tile.length - 1);
        tile = tile.map(row => row.substring(1, row.length -1));
        return tile;
    }

    const rotate90 = (tile) => {
        let matrix = tile.map(line => line.split("").concat());
        matrix = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
        return matrix.map(row => row.join(""));
    }

    const generateRotations = (tile) => {
        return [tile, rotate90(tile), rotate90(rotate90(tile)), rotate90(rotate90(rotate90(tile)))];
    }

    const correctOrientation = (edge, side, tile) => {
        // find rotation/flip where it matches the edge on the correct side
        // and return that rotated 180 (so that the two pieces fit)
        const otherside = {
            'right': 'left',
            'left': 'right',
            'top': 'bottom',
            'bottom': 'top'
        }
        for(rotation of generateRotations(tile.tile)){
            if(getEdges(rotation)[otherside[side]] === edge){
                return rotation;
            }
            const flipHorizontal = rotation.map(row => row.split("").reverse().join(""));
            if(getEdges(flipHorizontal)[otherside[side]] === edge){
                return flipHorizontal;
            }
        }
    }

    // from part 1 we know the corners: 1019, 1249, 3169, 3467
    // figure out which one is top left and dfs from there
    let jigsaw = new Array(Math.sqrt(data.length)).fill().map(() => new Array(Math.sqrt(data.length)).fill());
    let used = new Set();
    const directions = [['right', 0, 1], ['left', 0, -1], ['top', -1, 0], ['bottom', 1, 0]];
    const dfs = (currTileNo, x, y) => {
        jigsaw[x][y] = currTileNo;
        used.add(currTileNo);
        // iterate over the rest
        for([tileNo, tile] of Object.entries(tiles)){
            if(used.has(tileNo))
                continue;
            // check all 4 directions
            for(dir of directions)
                if(tile.edges.includes(tiles[currTileNo][dir[0]]) && 
                    x + dir[1] < Math.sqrt(data.length) && y + dir[2] < Math.sqrt(data.length) &&
                    x + dir[1] >= 0 && y + dir[2] >= 0){
                    // correct the tile with its new flip/rotation, and update the tile
                    tiles[tileNo] = correctTile(correctOrientation(tiles[currTileNo][dir[0]], dir[0], tile));
                    dfs(tileNo, x + dir[1], y + dir[2]);
                    break;
                }
        }
    }

    dfs('1019', 0, 0);
    let picture = new Array(98).fill().map(() => new Array(98));
    let [x, y] = [0, 0];
    for(let i = 0; i < jigsaw.length; i++){
        for(let j = 0; j < jigsaw.length; j++){
            const matrix = tiles[jigsaw[i][j]].tile.map(elem => elem.split(""));
            for(let ii = 0; ii < matrix.length; ii++)
                for(let jj = 0; jj < matrix.length; jj++)
                    picture[x + ii][y + jj] = matrix[ii][jj];
            y += 8;
        }
        x += 8;
        y = 0;
    }
    picture.forEach(elem => console.log(elem.join("")));
});