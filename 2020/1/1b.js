import fs from 'fs'
import arrays from '../../common/arrays.js'

function solve() {
    // let input = [1721, 979, 366, 299, 675, 1456]
    let input = readInput()
    let result
    forEachGroup(3, input, group => {
        let sum = group.reduce((lhs, rhs) => lhs + rhs)
        if (sum === 2020) {
            if (result) {
                throw new Error('Found multiple results')
            }
            result = group.reduce((lhs, rhs) => lhs * rhs)
        }
    })
    console.log(result)
}

function readInput() {
    return fs
        .readFileSync('input.txt', 'utf8')
        .split('\n')
        .map(line => Number(line.trim()))
}

function forEachGroup(groupSize, data, action) {
    let indices = []
    for (let groupIndex = 0; groupIndex < groupSize; ++groupIndex) {
        indices[groupIndex] = groupIndex
    }
    do {
        let groupValues = indices.map(index => data[index])
        action(groupValues)
    } while (incrementIndices(groupSize, indices, data))
}

function incrementIndices(groupSize, indices, data) {
    for (let groupIndex = groupSize - 1; groupIndex >= 0; --groupIndex) {
        if (indices[groupIndex] < data.length - groupSize + groupIndex) {
            let newIndex = ++indices[groupIndex]
            for (let subGroupIndex = groupIndex + 1; subGroupIndex < groupSize; ++subGroupIndex) {
                indices[subGroupIndex] = ++newIndex
            }
            return true
        }
    }
    return false
}

solve()

function incrementIndicesTest() {
    const dataSize = 7
    let expectedValues = []
    for (let index1 = 0; index1 < dataSize; ++index1) {
        for (let index2 = index1 + 1; index2 < dataSize; ++index2) {
            for (let index3 = index2 + 1; index3 < dataSize; ++index3) {
                expectedValues.push([index1, index2, index3])
            }
        }
    }
    let data = Array(dataSize)
    for (let index = 0; index < dataSize; ++index) {
        data[index] = index
    }
    forEachGroup(3, data, group => {
        let expected = expectedValues.shift()
        if (!arrays.equal(group, expected)) {
            throw new Error('Assertion failed: ' + group + ' != ' + expected)
        }
    })
    if (expectedValues.length !== 0) {
        throw new Error('Expected values not exhausted')
    }
    console.log('incrementIndicesTest succeeded')
}

incrementIndicesTest()
