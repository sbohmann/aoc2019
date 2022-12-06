const fs = require('fs')
const {add} = require('../reduce')

let result4a =
    fs.readFileSync('input.txt', 'utf-8')
        .split('\n')
        .filter(line => line.length > 0)
        .map(lineResult)
        .reduce(add)

function lineResult(line) {
    let match = line.match(/^(\d+)-(\d+),(\d+)-(\d+)$/)
    let firstRange = range(match[1], match[2])
    let secondRange = range(match[3], match[4])
    if (firstRange.contains(secondRange) || secondRange.contains(firstRange)) {
        return 1
    }
    return 0
}

function range(first, last) {
    return {
        first: Number(first),
        last: Number(last),
        contains(other) {
            return other.first >= first && other.last <= last
        }
    }
}

console.log("4a:", result4a)
