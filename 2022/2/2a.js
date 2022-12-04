const fs = require('fs')
const {add} = require('../reduce.js')
const {parseHand, evaluateRound} = require('./rules.js')

function resultForLine(line) {
    let match = line.match(/([ABC]) ([XYZ])/)
    if (!match) {
        throw new RangeError("Failed to parse line [" + line + "]")
    }
    let opponentHand = parseHand(match[1])
    let playerHand = parseHand(match[2])
    return evaluateRound(playerHand, opponentHand)
}

let result = fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(resultForLine)
    .reduce(add)

console.log(result)
