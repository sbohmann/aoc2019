const intcode = require('../intcode/intcode')
let map_grid = require('../map_grid/map_grid')

let grid = map_grid.MapGrid(0)
let score = 0

let output_buffer = []

let output_handler
let input_provider

function position(x, y) {
    return {x: x, y: y}
}

function handle_command(x, y, value) {
    if (x === -1 && y === 0) {
        score = value
    } else {
        grid.set(position(x, y), value)
    }
    if (output_handler) {
        output_handler(x, y, value)
    }
}

function handle_output(value) {
    output_buffer.push(value)
    while (output_buffer.length >= 3) {
        let arguments = output_buffer.splice(0, 3)
        handle_command.apply(null, arguments)
    }
}

let machine = intcode.Intcode_from_file(
    'input.txt',
    () => input_provider ? input_provider() : 0,
    handle_output)

exports.grid = grid
exports.run = () => {
    machine.run()
}
exports.step = () => {
    machine.step()
}
exports.value_to_character = value => {
    switch (value) {
        case 0:
            return ' '
        case 1:
            return '█'
        case 2:
            return 'X'//'▒'
        case 3:
            return '='
        case 4:
            return '*'
        default:
            return value
    }
}
exports.coin = () => {
    machine.memset(0, 2)
}
exports.set_output_handler = handler => output_handler = handler
exports.set_input_provider = provider => input_provider = provider
exports.score = () => score
