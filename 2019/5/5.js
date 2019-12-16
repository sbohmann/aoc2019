let intcode = require('../intcode/intcode')

function input() {
    return 1
}

let result = []

function output(value) {
    result.push(value)
}

let machine = intcode.Intcode_from_file('input.txt', input, output)
machine.run()
console.log(result)
console.log(machine.result(0))
