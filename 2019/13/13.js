const intcode = require('../intcode/intcode')
let map_grid = require('../map_grid/map_grid')

let grid = map_grid.MapGrid(0)

let input = []
let output_buffer = []

function position(x, y) {
    return {x: x, y: y}
}

function handle_command(x, y, value) {
    grid.set(position(x, y), value)
}

function handle_output(value) {
    output_buffer.push(value)
    while (output_buffer.length >= 3) {
        let arguments = output_buffer.splice(0, 3)
        console.log(arguments)
        handle_command.apply(null, arguments)
    }
}

intcode.Intcode_from_file(
    'input.txt',
    () => input.shift(),
    handle_output)
    .run()

let blocks = 0
grid.write_to_console(value => {
    switch (value) {
        case 0:
            return ' '
        case 1:
            return '█'
        case 2:
            ++blocks
            return '▒'
        case 3:
            return '='
        case 4:
            return '*'
        default:
            throw Error()
    }
})
console.log(blocks)
