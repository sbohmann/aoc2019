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
    forEachSubGroup(groupSize, 0, data, action)
}

function forEachSubGroup(groupSize, startIndex, data, action) {
    if (groupSize === 1) {
        forEachSingleElementGroup(startIndex, data, action)
    } else {
        for (let index = startIndex; index < data.length; ++index) {
            forEachSubGroup(groupSize - 1, index + 1, data,
                subGroup => action([data[index]].concat(subGroup)))
        }
    }
}

function forEachSingleElementGroup(startIndex, data, action) {
    for (let index = startIndex; index < data.length; ++index) {
        action([data[index]])
    }
}

solve()
