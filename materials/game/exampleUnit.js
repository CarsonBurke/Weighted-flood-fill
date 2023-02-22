class ExampleUnit extends GameObject {
    constructor(type, gameID, ownerID, left, top, inputs, outputs, weightLayers, activationLayers) {

        super(type, gameID, ownerID, left, top)

        const exampleUnit = this

        exampleUnit.fitness = 0

        if (weightLayers && activationLayers) {

            exampleUnit.network = new NeuralNetwork(weightLayers, activationLayers)

        } else {

            exampleUnit.network = new NeuralNetwork()
            exampleUnit.network.construct(inputs.length, outputs.length)
        }

        exampleUnit.network.learn()
    }
}

ExampleUnit.prototype.generateFitness = function() {

    const exampleUnit = this

    exampleUnit.fitness += Math.round(exampleUnit.pos.left * exampleUnit.pos.top)
}