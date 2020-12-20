import {readLines} from '../../common/io.js'

const CODE_LENGTH = 10

const lines = readLines('input.txt')

function solveA() {
    console.log(
        'a:',
        lines
            .map(seatNumber)
            .reduce((lhs, rhs) => Math.max(lhs, rhs)))
}

function solveB() {
    const existingSeats = new Set(lines.map(seatNumber))
    function match(seatNumber) {
        return !existingSeats.has(seatNumber) &&
            existingSeats.has(seatNumber - 1) &&
            existingSeats.has(seatNumber + 1)
    }
    let result = undefined
    for (let seatNumber = 0; seatNumber < 1024; ++seatNumber) {
        if (match(seatNumber)) {
            if (result) {
                throw new Error('Multiple results: ' + result + ', ' + seatNumber)
            }
            result = seatNumber
        }
    }
    console.log('b:', result)
}

function seatNumber(code) {
    checkCodeLength(code)
    let result = 0
    for (let index = 0; index < CODE_LENGTH; ++index) {
        if (index > 0) {
            result <<= 1
        }
        result |= bitForCharacter(code[index])
    }
    return result
}

function checkCodeLength(code) {
    if (code.length !== CODE_LENGTH) {
        throw new RangeError('Illegal Code length: ' + code.length + ' [' + code + ']')
    }
}

function bitForCharacter(character) {
    switch (character) {
        case 'B':
        case 'R':
            return 1
        case 'F':
        case 'L':
            return 0
        default:
            throw new RangeError('Illegal character [' + code[index] + '] in code [' + code + ']')
    }
}

solveA()

solveB()
