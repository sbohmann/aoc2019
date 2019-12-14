let fs = require('fs')

let data = new Map()
let index

function run() {
    while (true) {
        if (step()) {
            break;
        }
    }
}

function step() {
    let opcode = read_opcode()
    switch(opcode) {
        case 1:
            add()
            break
        case 2:
            multiply()
            break
        case 99:
            return true
        default:
            throw RangeError("Unknown opcode: " + opcode)
    }
}

function read_opcode() {
    let result = data.get(index)
    if (!result) {
        throw RangeError("Index out of range: " + index)
    }
    return result
}

function add() {
    binary_operation((lhs, rhs) => lhs + rhs)
}

function multiply() {
    binary_operation((lhs, rhs) => lhs * rhs)
}

function binary_operation(raw_operation) {
    let lhs_source = data.get(index + 1)
    let rhs_source = data.get(index + 2)
    let result = raw_operation(data.get(lhs_source), data.get(rhs_source))
    let target = data.get(index + 3)
    data.set(target, result)
    index += 4
}

function read_data() {
    let raw_data = read_raw_data()
    build_data(raw_data)
}

function read_raw_data() {
    return fs.readFileSync('input.txt', 'utf8')
        .split(',')
        .map(line => Number(line))
}

function build_data(raw_data) {
    data.clear()
    for (let index = 0; index < raw_data.length; ++index) {
        data.set(index, raw_data[index])
    }
    index = 0
}

function a() {
    read_data()

    data.set(1, 12)
    data.set(2, 2)

    run()

    console.log("a: " + data.get(0))
}

function b() {
    let raw_data = read_raw_data()
    for (let noun = 0; noun <= 99; ++noun) {
        for (let verb = 0; verb <= 99; ++verb) {
            build_data(raw_data)
            data.set(1, noun)
            data.set(2, verb)
            run()
            if (data.get(0) === 19690720) {
                console.log('noun: ' + noun + ', verb: ' + verb)
                console.log('b: ' + (100 * noun + verb))
            }
        }
    }
}

function simple() {
    let simple = [[1, 0, 0, 0, 99],
        [2, 3, 0, 3, 99],
        [2, 4, 4, 5, 99, 0],
        [1, 1, 1, 4, 99, 5, 6, 0, 99]]

    for (let input of simple) {
        build_data(input)
        run()
        for (let entry of data.entries()) {
            console.log(entry[0] + ': ' + entry[1])
        }
    }
}

b()
