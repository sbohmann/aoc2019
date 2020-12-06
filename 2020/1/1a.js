import fs from 'fs'

function solve() {
    let input = readInput()
    let result
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
    return fs
        .readFileSync('input.txt', 'utf8')
        .split('\n')
        .map(line => Number(line.trim()))
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
