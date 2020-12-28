import {readLines} from '../../common/io.js'

const prefixLength = 25

let data = readLines('input.txt').map(Number)

function solveA() {
    for (let index = prefixLength; index < data.length; ++index) {
        if (!sumOfTwoDistinctNumbersInRange(data[index], index - prefixLength, index)) {
            console.log('A:', data[index])
            return data[index]
        }
    }
}

function sumOfTwoDistinctNumbersInRange(number, begin, end) {
    for (let lhsIndex = 0; lhsIndex < end - 1; ++lhsIndex) {
        for (let rhsIndex = lhsIndex + 1; rhsIndex < end; ++rhsIndex) {
            let lhs = data[lhsIndex]
            let rhs = data[rhsIndex]
            if (lhs !== rhs && lhs + rhs === number) {
                return true
            }
        }
    }
}

function solveB(invalidNumber) {
    for (let index = 0; index < data.length; ++index) {
        let first = data[index]
        let sum = first
        let minimum = first
        let maximum = first
        let nextIndex = index + 1
        while (sum < invalidNumber && nextIndex < data.length) {
            let next = data[nextIndex++]
            sum += next
            if (next < minimum) minimum = next
            if (next > maximum) maximum = next
            if (sum === invalidNumber) {
                console.log('B:', minimum + maximum)
            }
        }
    }
}

let invalidNumber = solveA()

solveB(invalidNumber)
