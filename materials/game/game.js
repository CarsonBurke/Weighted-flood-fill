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

        while (this.floodGenGraph.length) {

            let nextFloodGen = []

            for (const coord of this.floodGenGraph) {

                if (this.graph[packCoord(coord)] > 0) {

                    this.graph[packCoord(coord)] -= 1
                    nextFloodGen.push(coord)
                    continue
                }

                for (const offset of adjacentOffsets) {

                    const adjCoord = {
                        x: coord.x + offset.x,
                        y: coord.y + offset.y
                    }

                    // We're outside the map
                    console.log(isXYInGraph(adjCoord.x, adjCoord.y))
                    if (!isXYInGraph(adjCoord.x, adjCoord.y)) continue

                    if (this.graph[packCoord(adjCoord)] === 255) continue
                    
                    if (this.visited[packCoord(adjCoord)] === 1) continue
                    this.visited[packCoord(adjCoord)] = 1
                    
                    nextFloodGen.push(adjCoord)
                }
            }
            
            this.floodGenGraph = nextFloodGen
            break
        }

        if (!this.floodGenGraph.length) this.running = false

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
    this.floodGenGraph = [{
        x: 2,
        y: 2
    }]
    for (const coord of this.floodGenGraph) this.visited[packCoord(coord)] = 1

    for (let x = 0; x < env.graphSize; x++) {
        for (let y = 0; y < env.graphSize; y++) {

            this.graph[packXY(x, y)] = 0
        }
    }

    let coords = findCoordsInsideRect(15, 10, 30, 20)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 255
    }

    coords = findCoordsInsideRect(8, 60, 80, 25)

    for (const coord of coords) {

        this.graph[packCoord(coord)] = 255
    }
}

Game.prototype.visualize = function() {

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
}