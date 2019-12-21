const fs = require('fs')

const data = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('')
    .map(digit => {
        let result = Number(digit)
        if (Number.isNaN(result)) {
            throw Error('Illegal digit: [' + digit + ']')
        }
        return result
    })
    .map(value => {
        if (Number.isInteger(value) && value >= 0 && value <= 9) {
            return value
        } else {
            throw Error('Illegal value: ' + value)
        }
    })

const image_size = 25 * 6

if (data.length % image_size !== 0) {
    throw Error('Illegal data length ' + data.length)
}

const number_of_layers = data.length / image_size

let minimum_zeroes
let frequencies_with_minimum_zeroes

for (let layer = 0; layer < number_of_layers; ++layer) {
    const offset = layer * image_size
    const frequencies = Array(10).fill(0)
    for (let index = 0; index < image_size; ++index) {
        let value = data[offset + index]
        ++frequencies[value]
    }
    if (minimum_zeroes === undefined || frequencies[0] < minimum_zeroes) {
        minimum_zeroes = frequencies[0]
        frequencies_with_minimum_zeroes = frequencies
    }
}

console.log(frequencies_with_minimum_zeroes)
console.log(frequencies_with_minimum_zeroes[1] * frequencies_with_minimum_zeroes[2])

let result = Array(image_size).fill(2)

for (let layer = 0; layer < number_of_layers; ++layer) {
    const offset = (number_of_layers - layer - 1) * image_size
    for (let index = 0; index < image_size; ++index) {
        let value = data[offset + index]
        if (value !== 2) {
            result[index] = value
        }
    }
}

for (let y = 0; y < 6; ++y) {
    let line = '['
    for (let x = 0; x < 25; ++x) {
        let pixel = result[y * 25 + x]
        switch (pixel) {
            case 0:
                line += ' '
                break
            case 1:
                line += '#'
                break
            case 2:
                line += '?'
                break
            default:
                throw Error('Illegal pixel value: ' + pixel)
        }
    }
    line += ']'
    console.log(line)
}
