function packCoord(coord) {

    return coord.x * env.graphSize + coord.y
}

function packXY(x, y) {

    return x * env.graphSize + y
}

function unpackCoord(packedCoord) {

    return {
        x: Math.floor(packedCoord / env.graphSize),
        y: Math.floor(packedCoord % env.graphSize),
    }
}