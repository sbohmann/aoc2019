const intcode = require('../intcode/intcode')
const map_grid = require('../map_grid/map_grid')

const right = {dx: 1, dy: 0, command: 4}
const up = {dx: 1, dy: 0, command: 1}
const left = {dx: 1, dy: 0, command: 3}
const down = {dx: 1, dy: 0, command: 2}

let map = map_grid.MapGrid()
let current_position = {x: 0, y: 0}
let current_direction
let current_distance = 0

function move(direction) {
    current_direction = direction
}

function moved(direction) {
    return {
        x: current_position.x + direction.x,
        y: current_position.y + direction.y
    }
}

let input = []

next_step() {
    // TODO
}


function handle_output(value) {
    switch (value) {
        case 0:
            map.set(moved(current_direction), 0)
            break
        case 1:
        case 2:
            current_position = moved(current_direction)
            let distance = map.get(current_position)
            if (distance === undefined || current_distance + 1 < distance) {
                ++current_distance
                map.set(current_position, current_distance)
            } else {
                current_distance = distance
            }
            break
        default:
            throw Error()
    }
    if (value === 2) {
        console.log('15: ' + current_distance)
    }
    next_step()
}

let machine = intcode.Intcode_from_file(
    './input.txt',
    () => input.shift(),
    handle_output)

move(up)

machine.run()
