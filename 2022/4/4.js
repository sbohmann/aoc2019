const fs = require('fs')
const {add} = require('../../common/reduce')

let result4a =
    fs.readFileSync('input.txt', 'utf-8')
        .split('\n')
        .filter(line => line.length > 0)
        .map(lineResult)
        .reduce(add)

console.log("4a:", result4a)

let result4b =
    fs.readFileSync('input.txt', 'utf-8')
        .split('\n')
        .filter(line => line.length > 0)
        .map(lineRanges)
        .filter(lineRangesOverlap)
        .length

console.log("4b:", result4b)

function lineResult(line) {
    let {first, second} = lineRanges(line)
    if (first.containsRange(second) || second.containsRange(first)) {
        return 1
    }
    return 0
}

function lineRanges(line) {
    let match = line.match(/^(\d+)-(\d+),(\d+)-(\d+)$/)
    let first = range(match[1], match[2])
    let second = range(match[3], match[4])
    return {first, second}
}

function range(first, last) {
    return {
        first: Number(first),
        last: Number(last),
        contains(value) {
            return value >= first && value <= last
        },
        containsRange(other) {
            return other.first >= first && other.last <= last
        }
    }
}

function lineRangesOverlap(lineRanges) {
    return rangesOverlap(lineRanges.first, lineRanges.second)
}

function rangesOverlap(a, b) {
    return a.contains(b.first) ||
        a.contains(b.second) ||
        b.contains(a.first) ||
        b.contains(a.second)
}
