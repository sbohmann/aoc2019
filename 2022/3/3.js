const fs = require('fs')
const {add} = require('../reduce')

function ordinalItem(item) {
    return item.codePointAt(0)
}

const aOrdinal = ordinalItem('a')
const zOrdinal = ordinalItem('z')
const AOrdinal = ordinalItem('A')
const ZOrdinal = ordinalItem('Z')

function priority(item) {
    let ordinal = ordinalItem(item)
    if (ordinal >= aOrdinal && ordinal <= zOrdinal) {
        return ordinal - aOrdinal + 1
    }
    if (ordinal >= AOrdinal && ordinal <= ZOrdinal) {
        return ordinal - AOrdinal + 27
    }
    throw new RangeError()
}

function resultForLine(line) {
    let result = 0
    let {firstCompartment, secondCompartment} = splitBagCompartments(line)
    let firstCompartmentItems = new Set([...firstCompartment])
    let secondCompartmentItems = new Set([...secondCompartment])
    for (let item of secondCompartmentItems) {
        if (firstCompartmentItems.has(item)) {
            result += priority(item)
        }
    }
    return result
}

function splitBagCompartments(line) {
    let compartmentSize = line.length / 2
    if (!Number.isInteger(compartmentSize)) {
        throw new RangeError()
    }
    return {
        firstCompartment: line.slice(0, compartmentSize),
        secondCompartment: line.slice(compartmentSize)
    }
}

let result = fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(resultForLine)
    .reduce(add)

console.log(result)
