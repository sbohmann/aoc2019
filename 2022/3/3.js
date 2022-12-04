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

function sharedPriorityForTwoCompartmentLine(line) {
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

let result3a = fs.readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(sharedPriorityForTwoCompartmentLine)
    .reduce(add)

console.log("3a:", result3a)

function lineTriples(lines) {
    let result = []
    for (let index = 0; index < lines.length; index += 3) {
        let triple = []
        for (let offset = 0; offset < 3; ++offset) {
            triple.push(lines[index + offset])
        }
        result.push(triple)
    }
    return result
}

function priorityOfSharedItem(triple) {
    let firstTripleItems = new Set([...triple[0]])
    let secondTripleItems = new Set([...triple[1]])
    let thirdTripleItems = new Set([...triple[2]])
    let resultSet = setIntersection(
        setIntersection(firstTripleItems, secondTripleItems),
        thirdTripleItems
    )
    // if (resultSet.size !== 1) {
    //     throw new RangeError()
    // }
    let result = 0
    for (let item of resultSet) {
        result += priority(item)
    }
    return result
}

function setIntersection(a, b) {
    let result = new Set()
    for (let element of b) {
        if (a.has(element)) {
            result.add(element)
        }
    }
    return result
}

let result3b = lineTriples(
    fs.readFileSync('input.txt', 'utf-8')
        .split('\n')
        .filter(line => line.length > 0))
    .map(priorityOfSharedItem)
    .reduce(add)

console.log("3b:", result3b)
