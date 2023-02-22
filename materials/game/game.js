import { adjacentOffsets } from "./gameConstants"

class Game {
    
    running = false
    graph = new Uint8Array()
    visited = new Uint8Array()

    constructor() {

        const game = this
        game.ID = env.newID()

        game.running = true
        game.graph = new Uint8Array(env.graphSize * env.graphSize)
        game.visited = new Uint8Array(env.graphSize * env.graphSize)
        game.floodGen

        env.games[game.ID] = game
    }
    run() {

        while (game.flooded.length) {
        let nextFloodGen = []

        for (let x = 0; x < env.graphSize; x++) {
            for (let y = 0; y < env.graphSize; y++) {

                for (offset of adjacentOffsets) {

                    const adjCoord = {
                        x: x + offset.x,
                        y: y + offset.y
                    }
 
                    if (game.graph[packCoord(adjCoord)] === undefined) continue

                    if (game.visited[packCoord(adjCoord)] === 1) continue
                    game.visited[packCoord(adjCoord)] = 1

                    nextFloodGen.push(adjCoord)
                }
            }
        }

        game.flooded = nextFloodGen
    }

        this.visualize()
    }
}

Game.prototype.init = function() {

    const game = this

    for (let x = 0; x < env.graphSize; x++) {
        for (let y = 0; y < env.graphSize; y++) {

            game.graph[packXY(x, y)] = 0
            if (Math.random() > 0.5) game.visited[packXY(x, y)] = 1
        }
    }

    game.graph[packXY(25, 25)] = 255
}

Game.prototype.reset = function() {

    const game = this



    game.running = true
}

Game.prototype.visualize = function() {

    const game = this

    for (let x = 0; x < env.graphSize; x++) {
        for (let y = 0; y < env.graphSize; y++) {

            let color = 'grey'
            if (game.graph[packXY(x, y)] === 255) color = 'red'
            else if (game.visited[packXY(x, y)] === 1) color = 'green'
            env.cm.fillStyle = color
            console.log(x, y, color)
            env.cm.beginPath();
            env.cm.fillRect(x * env.coordSize, y * env.coordSize, env.coordSize, env.coordSize);
            env.cm.stroke();
        }
    }
}