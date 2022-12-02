const fs = require('fs')

let input = fs.readFileSync('input.txt', 'utf-8')

let parts = input.split(/\n\n/)

function partSum(part) {
    let items = part.split(/\n/).map(Number)
    return items.reduce(add)
}

let add = (a, b) => a + b

let max = (a, b) => Math.max(a, b)

let partSums = parts.map(partSum)

let maximum = partSums.reduce(max)

console.log(maximum)

function updateTopThree(state, value) {
    for (let index = 0; index < state.length; ++index) {
        if (value > state[index]) {
            return insert(state, index, value)
        }
    }
    if (state.length < 3) {
        let result = [...state]
        result.push(value)
        return result
    }
    return state
}

function insert(state, position, value) {
    result = state.slice(0, position)
    result.push(value)
    let n = 3 - result.length
    for (let offset = 0; offset < n; ++offset) {
        result.push(state[position + offset])
    }
    return result
}

let topThree = partSums.reduce(updateTopThree, [])

console.log(topThree)
console.log(topThree.reduce(add))
