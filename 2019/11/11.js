let intcode = require('../intcode/intcode')
let map_grid = require('../map_grid/map_grid')

let grid = map_grid.MapGrid(false)

let position = {x: 0, y: 0}
let direction = {x: 0, y: -1}
grid.set(position, true)
let input = [grid.get(position)]
let output_buffer = []

function step() {
    position.x += direction.x
    position.y += direction.y
}

function turn_right() {
    direction = {
        x: -direction.y,
        y: direction.x
    }
}

function turn_left() {
    direction = {
        x: direction.y,
        y: -direction.x
    }
}

function is_white(color) {
    switch (color) {
        case 0:
            return false
        case 1:
            return true
        default:
            throw Error()
    }
}

function turn(turn_direction) {
    switch(turn_direction) {
        case 0:
            turn_left()
            break
        case 1:
            turn_right()
            break
        default:
            throw Error()
    }
}

function handle_output(value) {
    output_buffer.push(value)
    while (output_buffer.length >= 2) {
        let color = output_buffer.shift()
        let turn_direction = output_buffer.shift()
        grid.set(position, is_white(color))
        turn(turn_direction)
        step()
        input.push(grid.get(position))
    }
}

intcode.Intcode_from_file(
    'input.txt',
    () => input.shift() ? 1 : 0,
    handle_output)
    .run()

grid.write_to_console(value => value ? '#' : ' ')

console.log()
console.log(grid.painted.size)
