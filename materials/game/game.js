class Game {
    
    running = false
    graph = new Uint8Array()
    visited = new Uint8Array()

    constructor() {

        this.ID = env.newID()

        env.games[this.ID] = this
    }
    run() {
        if (!this.running) {
            this.visualize()
            return
        }

        while (this.floodGenGraph.size) {

            let nextFloodGen = new Set()

            for (const packedCoord of this.floodGenGraph) {

                const coord = unpackCoord(packedCoord)

                if (this.graph[packedCoord] > 0) {

                    this.graph[packedCoord] -= 1
                    nextFloodGen.add(packedCoord)
                    continue
                }

                for (const offset of adjacentOffsets) {

                    const adjCoord = {
                        x: coord.x + offset.x,
                        y: coord.y + offset.y
                    }

                    // We're outside the map

                    if (!isXYInGraph(adjCoord.x, adjCoord.y)) continue

                    const packedAdjcoord = packCoord(adjCoord)

                    if (this.graph[packedAdjcoord] === 255) continue
                    
                    if (this.visited[packedAdjcoord] === 1) continue
                    this.visited[packedAdjcoord] = 1
                    
                    nextFloodGen.add(packedAdjcoord)
                }
            }
            
            this.floodGenGraph = nextFloodGen
            break
        }

        for (const packedCoord of this.goals) {
            
            if (!this.floodGenGraph.has(packedCoord)) continue

            this.running = false
        }

        if (!this.floodGenGraph.size) this.running = false

        this.visualize()
    }
    reset() {

        this.init()
    }
}

Game.prototype.init = function() {

    this.running = true
    this.graph = new Uint8Array(env.graphSize * env.graphSize)
    this.visited = new Uint8Array(env.graphSize * env.graphSize)
    this.floodGenGraph = new Set([packXY(env.graphSize - 1, env.graphSize - 1)])
    for (const packedCoord of this.floodGenGraph) this.visited[packedCoord] = 1
    this.goals = new Set([packXY(35, 10), packXY(5, 40)])

    for (let x = 0; x < env.graphSize; x++) {
        for (let y = 0; y < env.graphSize; y++) {

            this.graph[packXY(x, y)] = 0
        }
    }

    let coords = findCoordsInsideRect(15, 10, 30, 20)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 255
    }

    coords = findCoordsInsideRect(8, 30, 25, 90)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 255
    }

    coords = findCoordsInsideRect(8, 90, 25, 100)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 20
    }

    coords = findCoordsInsideRect(50, 60, 80, 80)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 255
    }

    coords = findCoordsInsideRect(26, 60, 50, 80)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 30
    }

    coords = findCoordsInsideRect(65, 5, 80, 60)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 255
    }

    coords = findCoordsInsideRect(50, 0, 60, 55)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 255
    }

    coords = findCoordsInsideRect(61, 0, 64, 10)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 50
    }
}

Game.prototype.visualize = function() {

    // Draw flood values

    for (let x = 0; x < env.graphSize; x++) {
        for (let y = 0; y < env.graphSize; y++) {

            let color = `hsl(${this.graph[packXY(x, y)] / 2}, 100%, 60%)`
            if (this.visited[packXY(x, y)] === 1 && this.graph[packXY(x, y)] === 0) color = 'blue'
            env.cm.fillStyle = color

            env.cm.beginPath();
            env.cm.fillRect(x * env.coordSize, y * env.coordSize, env.coordSize, env.coordSize);
            env.cm.stroke();
        }
    }

    // Draw goals

    env.cm.fillStyle = 'white'

    for (const packedCoord of this.goals) {

        const coord = unpackCoord(packedCoord)

        env.cm.font = `${env.coordSize * 2}px Arial`
        env.cm.fillText("X", coord.x * env.coordSize, coord.y * env.coordSize)
    }
}