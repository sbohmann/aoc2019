import {readLines} from '../../common/io.js'

let input = readLines('input.txt')
let startTime = input[0]
let busses = input[1]
    .split(',')
    .filter(bus => bus !== 'x')
    .map(Number)

function solveA() {
    let result = busses
        .map(bus => [bus, calculateWaitingTime(bus)])
        .reduce((minimum, current) => {
            if (minimum === undefined) {
                return current
            } else {
                let [, minimumWaitingTime] = minimum
                let [, currentWaitingTime] = current
                if (currentWaitingTime < minimumWaitingTime) {
                    return current
                } else {
                    return minimum
                }
            }
        })
    let [bus, waitingTime] = result
    console.log('A:', bus * waitingTime, bus, waitingTime)
}

function calculateWaitingTime(bus) {
    let offset = Math.trunc(startTime / bus) * bus
    let result = offset - startTime
    if (result < 0) {
        result += bus
    }
    if (result < 0 || result >= bus) {
        throw new Error()
    }
    return result
}

solveA()

let [X, Y] = [4, 6]
let offset = 2
let n = 0
let last
while (n < 1_000) {
    if (n % X === 0 && (n + offset) % Y === 0) {
        if (last) {
            console.log(n, last)
        } else {
            console.log(n)
        }
        console.log((n / X) + " * X + " + offset + " = " + ((n + offset) / Y) + " * Y")
        last = n
    }
    ++n
}
