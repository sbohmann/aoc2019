import {readLines} from '../../common/io.js'

let sums = new Map([[1, 0], [2, 0], [3, 0]])

let input = readLines('input.txt')
    .map(Number)

// let input = [28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3]

input.push(0)
input.sort((lhs, rhs) => lhs - rhs)
input.push(input[input.length - 1] + 3)

// console.log(input)

function solveA() {
    for (let index = 1; index < input.length; ++index) {
        let difference = input[index] - input[index - 1]
        sums.set(difference, sums.get(difference) + 1)
    }
    console.log('A:', sums.get(1) * sums.get(3))
}

solveA()

function solveB() {
    console.log('B:', TotalNumberOfChains(0))
}

function TotalNumberOfChains() {
    let cache = new Map()

    function numberOfChains(index) {
        if (isLast(index)) {
            return 1
        } else {
            return numberOfFollowingChains(index)
        }
    }

    function numberOfFollowingChains(index) {
        let result = cache.get(index)
        if (!result) {
            result = calculateNumberOfFollowingChains(index)
            cache.set(index, result)
        }
        return result
    }

    function calculateNumberOfFollowingChains(index) {
        let result = 0
        for (let nextIndex = index + 1; nextIndex < input.length; ++nextIndex) {
            let difference = input[nextIndex] - input[index]
            if (1 <= difference && difference <= 3) {
                result += numberOfChains(nextIndex)
            }
        }
        return result
    }

    function isLast(index) {
        return index === input.length - 1
    }

    return numberOfChains(0)
}

solveB()
