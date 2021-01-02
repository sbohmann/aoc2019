import {readLines} from '../../common/io.js'
import * as mathjs from 'mathjs'

let input = readLines('input.txt')
let startTime = input[0]
let busses = input[1]
    .split(',')
    .map((rawValue, index) => ({rawValue, index}))
    .filter(bus => bus.rawValue !== 'x')
    .map(bus => ({interval: Number(bus.rawValue), offset: bus.index}))

function solveA() {
    function determineResult() {
        let {interval, waitingTime} = busses
            .map(bus => ({interval: bus.interval, waitingTime: calculateWaitingTime(bus.interval)}))
            .reduce(replaceMinimum)
        console.log('A:', interval * waitingTime, interval, waitingTime)
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

    function replaceMinimum(minimum, next) {
        if (minimum === undefined) {
            return next
        } else {
            if (next.waitingTime < minimum.waitingTime) {
                return next
            } else {
                return minimum
            }
        }
    }

    determineResult()
}

function solveB() {
    let minimum = 0
    let currentInterval = busses[0].interval

    function determineResult() {
        for (let nextBusIndex = 1; nextBusIndex < busses.length; ++nextBusIndex) {
            minimum = matchNextBus(busses[nextBusIndex])
        }
        console.log("B:", minimum)
    }

    function matchNextBus(nextBus) {
        let n = minimum
        while (true) {
            if (match(n, nextBus)) {
                break
            }
            n += currentInterval
        }
        return minimum
    }

    function match(n, nextBus) {
        if ((n + nextBus.offset) % nextBus.interval === 0) {
            reportIntermediateResult(n, nextBus)
            minimum = n
            currentInterval = mathjs.lcm(currentInterval, nextBus.interval)
            return true
        }
    }

    function reportIntermediateResult(n, nextBus) {
        let lhsTerm = minimum + " + " + ((n - minimum) / currentInterval) + " * " + currentInterval + " + " + nextBus.offset
        let rhsTerm = ((n + nextBus.offset) / nextBus.interval) + " * " + nextBus.interval
        console.log(n + ":", lhsTerm + " = " + rhsTerm)
    }

    determineResult()
}

solveA()
solveB()
