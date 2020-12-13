import {readLines} from '../../common/io.js'

function solve() {
    let input = readInput()
    let result = undefined
    forEachPair(input, (lhs, rhs) => {
        if (lhs + rhs === 2020) {
            if (result) {
                throw new Error('Found multiple results')
            }
            result = lhs * rhs
        }
    })
    console.log(result)
}

function readInput() {
    return readLines('input.txt')
        .map(Number)
}

function forEachPair(data, action) {
    for (let lhsIndex = 0; lhsIndex < data.length; ++lhsIndex) {
        for (let rhsIndex = lhsIndex + 1; rhsIndex < data.length; ++rhsIndex) {
            let lhs = data[lhsIndex]
            let rhs = data[rhsIndex]
            action(lhs, rhs)
        }
    }
}

solve()
