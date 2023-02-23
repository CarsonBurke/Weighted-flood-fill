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

/**
 * Takes a rectange and returns the positions inside of it in an array
 */
function findCoordsInsideRect(x1, y1, x2, y2) {
    const positions = []

    for (let x = x1; x <= x2; x += 1) {
        for (let y = y1; y <= y2; y += 1) {
            // Iterate if the pos doesn't map onto a room

            if (x < 0 || x >= env.graphSize || y < 0 || y >= env.graphSize) continue

            // Otherwise pass the x and y to positions

            positions.push({ x, y })
        }
    }

    return positions
}

function isXYInGraph(x, y) {

    return x >= 0 && x < env.graphSize && y >= 0 && y < env.graphSize
}