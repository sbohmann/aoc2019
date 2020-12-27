import {readLines} from '../../common/io.js'

function parse(input) {
    let pattern = /(\w+) ([+-]\d+)/
    let match = input.match(pattern)
    return [match[1], Number(match[2])]
}

function Statement(name, argument) {
    let call
    switch (name) {
        case 'acc':
            call = (accumulator, pointer) => [accumulator + argument, pointer + 1]
            break
        case 'jmp':
            call = (accumulator, pointer) => [accumulator, pointer + argument]
            break
        case 'nop':
            call = (accumulator, pointer) => [accumulator, pointer + 1]
            break
        default:
            throw new Error()
    }

    return {name, argument, call}
}

let code = readLines('input.txt')
    .map(parse)
    .map(parsed => Statement(...parsed))

function solveA() {
    let visitedAddresses = new Set()
    let accumulator = 0
    let pointer = 0
    while (true) {
        if (visitedAddresses.has(pointer)) {
            console.log('A:', accumulator)
            break
        }
        visitedAddresses.add(pointer)
        ;[accumulator, pointer] = code[pointer].call(accumulator, pointer)
    }
}

solveA()

function test(modifiedCode) {
    let visitedAddresses = new Set()
    let accumulator = 0
    let pointer = 0
    while (true) {
        if (visitedAddresses.has(pointer)) {
            return null
        }
        visitedAddresses.add(pointer)
        ;[accumulator, pointer] = modifiedCode[pointer].call(accumulator, pointer)
        if (pointer === modifiedCode.length) {
            return accumulator
        }
    }
}

function solveB() {
    let modifiable = (name) => name === 'jmp' || name === 'nop'

    function modified(statement) {
        switch (statement.name) {
            case 'jmp':
                return Statement('nop', statement.argument)
            case 'nop':
                return Statement('jmp', statement.argument)
            default:
                throw new Error()
        }
    }

    for (let address = 0; address < code.length; ++address) {
        let statement = code[address]
        if (modifiable(statement.name)) {
            let modifiedCode = Array.from(code)
            let modifiedStatement = modified(statement)
            modifiedCode[address] = modifiedStatement
            let result = test(modifiedCode)
            if (result !== null) {
                console.log('B:', 'Modified statement at address ' + address + ' from ' + statement + ' to ' + modifiedStatement)
                console.log('B:', result)
                break
            }
        }
    }
}

solveB()
