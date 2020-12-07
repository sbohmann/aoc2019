import fs from 'fs'
import arrays from '../../common/arrays.js'

function solve() {
    // let input = [1721, 979, 366, 299, 675, 1456]
    let input = readInput()
    let result
    Group(3, input).forEach(group => {
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

function Group(groupSize, data) {
    function forEachSubGroup(subGroupSize, startIndex, action) {
        if (subGroupSize === 1) {
            forEachSingleElementGroup(startIndex, action)
        } else {
            for (let index = startIndex; index < data.length; ++index) {
                forEachSubGroup(subGroupSize - 1, index + 1,
                    subGroup => action([data[index]].concat(subGroup)))
            }
        }
    }

    function forEachSingleElementGroup(startIndex, action) {
        for (let index = startIndex; index < data.length; ++index) {
            action([data[index]])
        }
    }

    return {
        forEach(action) {
            forEachSubGroup(groupSize, 0, action)
        }
    }
}

solve()