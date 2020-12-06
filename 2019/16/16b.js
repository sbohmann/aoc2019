const fs = require('fs')

function read_input() {
    const raw_input = fs.readFileSync('input.txt', 'utf8').trim()
    return Array.from(raw_input)
        .map(character => Number(character))
}

const base_pattern = [0, 1, 0, -1]

function pattern(multiplier, index) {
    ++index
    index = Math.trunc(index / multiplier)
    index %= base_pattern.length
    return base_pattern[index]
}

const input = read_input()
const length = input.length * 10000

function sum(round, multiplier) {
    let raw_pattern_index = 1
    let pattern_index = 0
    let result = 0
    for (let index = 0; index < length; ++index) {
        if (raw_pattern_index % multiplier === 0) {
            ++pattern_index
        }
        result += calculate(round, index)
        ++raw_pattern_index
    }
}

let cache = (function() {
    let round_maps = []

    function round_map(round) {
        let result = round_maps[round]
        if (result === undefined) {
            result = new Map()
            round_maps[round] = result
        }
        return result
    }

    return {
        get: (round, index) => {
            return round_map(round).get(index)
        },
        set: (round, index, value) => {
            round_map(round).set(index, value)
        }
    }
})()

function calculate(round, index) {
    if (index >= length) {
        throw RangeError('index: ' + index + ', length: ' + length)
    }
    if (round === 0) {
        return input[index % input.length]
    } else {
        let result = cache.get(round, index)
        if (result === undefined) {
            result = sum(round - 1, index)
            cache.set(round, index, result)
        }
        return result
    }
}

function interpret_digits(digits) {
    digits = Array.from(digits)
    digits.reverse()
    let shift = 1
    let result = 0
    for (let digit of digits) {
        result += (shift * digit)
        shift *= 10
    }
    return result
}

let offset = interpret_digits(input.slice(0, 7))
let result = new Array(8)
let result_round = 100
for (let index = 0; index < result.length; ++index) {
    result[index] = calculate(result_round, offset +index)
}
console.log(result)
console.log(interpret_digits(result))
