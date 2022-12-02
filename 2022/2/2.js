const fs = require('fs')
const {add} = require('../commons.js')

function hand(name, ordinal) {
    return Object.freeze({
        name,
        ordinal
    })
}

const Hand = Object.freeze({
    rock: hand('rock', 0),
    paper: hand('paper', 1),
    scissors: hand('scissors', 2),
    compare(a, b) {
        // trust me 🤣
        return (((3 + a.ordinal - b.ordinal) % 3 + 1) % 3 - 1)
    }
})

function resultForLine(line) {
    let match = line.match(/([ABC]) ([XYZ])/)
    if (!match) {
        throw new RangeError("Failed to parse line [" + line + "]")
    }
    let opponentHand = parseHand(match[1])
    let playerHand = parseHand(match[2])
    return evaluateRound(playerHand, opponentHand)
}

function parseHand(descriptor) {
    switch (descriptor) {
        case 'A':
        case 'X':
            return Hand.rock
        case 'B':
        case 'Y':
            return Hand.paper
        case 'C':
        case 'Z':
            return Hand.scissors
        default:
            throw new RangeError('Unrecognized hand descriptor: ' + descriptor)
    }
}

function evaluateRound(playerHand, opponentHand) {
    return resultPoints(playerHand, opponentHand) + handPoints(playerHand)
}

function resultPoints(playerHand, opponentHand) {
    let difference = Hand.compare(playerHand, opponentHand)
    switch (difference) {
        case -1:
            return 0
        case 0:
            return 3
        case 1:
            return 6
        default:
            throw new RangeError("Failed to interpret comparison result " + difference)
    }
}

function handPoints(playerHand) {
    switch (playerHand) {
        case Hand.rock:
            return 1
        case Hand.paper:
            return 2
        case Hand.scissors:
            return 3
        default:
            throw new RangeError("Unknown hand: " + hand.name)
    }
}

let result = fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(resultForLine)
    .reduce(add)

console.log(result)
