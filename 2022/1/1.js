const fs = require('fs')

let input = fs.readFileSync('input.txt', 'utf-8')

let parts = input.split(/\n\n/)

function partSum(part) {
    let items = part.split(/\n/).map(Number)
    return items.reduce((a, b) => a + b)
}

let max = (a, b) => Math.max(a, b)

let partSums = parts.map(partSum)

let maximum = partSums.reduce(max)

console.log(maximum)

function updateTopThree(state, value) {
    // 🤔
}

let topThree = partSums.reduce(updateTopThree, [])
