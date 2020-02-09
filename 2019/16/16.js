const fs = require('fs')

function read_input() {
    const raw_input = fs.readFileSync('input.txt', 'utf8').trim()
    return Array.from(raw_input)
        .map(character => Number(character))
}

function MultipliedArray(original, repetitions) {
    let length = original.length * repetitions
    let result = new Array(length)
    for (let index = 0; index < length; ++index) {
        result[index] = original[index % original.length]
    }
    return result
}

function run(repetitions) {
    const input = MultipliedArray(read_input(), repetitions)

    const length = input.length

    let state = Array.from(input)

    const base_pattern = [0, 1, 0, -1]
    for (let round = 1; round <= 100; ++round) {
        console.log('round: ' + round)
        let output = Array(length)
        for (let output_index = 0; output_index < length; ++output_index) {
            const multiplier = output_index + 1
            if ((output_index + 1) % 1000 === 0) {
                console.log(output_index / length)
            }
            let sum = 0
            let skip = multiplier - 1
            let pattern_index = skip + 1
            for (let input_index = skip; input_index < length; ++input_index) {
                sum += state[input_index] * base_pattern[Math.trunc(pattern_index / multiplier) % 4]
                ++pattern_index
            }
            output[output_index] = Math.abs(sum) % 10
        }
        state = output
    }

    return {
        input: input,
        state: state
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

let a_result = run(1)

let b_result = run(10000)

console.log('a: ' + interpret_digits(a_result.state.slice(0, 8)))

let offset = interpret_digits(b_result.input.slice(0, 7))
console.log('b: offset: ' + offset)
console.log('b: ' + interpret_digits(b_result.state.slice(offset, 8)))
