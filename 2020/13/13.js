import {readLines} from '../../common/io.js'

let input = readLines('input.txt')
let startTime = input[0]
let busses = input[1]
    .split(',')
    .map((rawValue, index) => ({ rawValue, index }))
    .filter(bus => bus.rawValue !== 'x')
    .map(bus => ({ interval: Number(bus.rawValue), offset: bus.index }))

function solveA() {
    let result = busses
        .map(bus => [bus.interval, calculateWaitingTime(bus.interval)])
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

function solveB() {
    let minimum = 0
    let currentInterval = busses[0].interval
    for (let nextBusIndex = 1; nextBusIndex < busses.length; ++nextBusIndex) {
        let nextBus = busses[nextBusIndex]
        let nextInterval = nextBus.interval
        let offset = nextBus.offset
        let n = minimum
        while (true) {
            if ((n + offset) % nextInterval === 0) {
                console.log(n + ":", minimum + " + " + ((n - minimum) / currentInterval) + " * " + currentInterval + " + " + offset + " = " + ((n + offset) / nextInterval) + " * " + nextInterval)
                minimum = n
                currentInterval *= nextInterval
                break
            }
            n += currentInterval
        }
    }
    console.log("B:", minimum)
}

solveA()
solveB()
