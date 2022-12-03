const fs = require('fs')
const {add} = require('../reduce.js')
const {parseHand, parseGoal, evaluateRound} = require('./common.js')

function resultForLine(line) {
    let match = line.match(/([ABC]) ([XYZ])/)
    if (!match) {
        throw new RangeError("Failed to parse line [" + line + "]")
    }
    let opponentHand = parseHand(match[1])
    let playerGoal = parseGoal(match[2])
    let playerHand = playerGoal.getAchievingHand(opponentHand)
    return evaluateRound(playerHand, opponentHand)
}

let result = fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(resultForLine)
    .reduce(add)

console.log(result)
