const intcode = require('../intcode/intcode')
const map_grid = require('../map_grid/map_grid')
const shuffled_array = require('../random/shuffled_array')

const right = {dx: 1, dy: 0, command: 4}
const up = {dx: 0, dy: -1, command: 1}
const left = {dx: -1, dy: 0, command: 3}
const down = {dx: 0, dy: 1, command: 2}
const directions = [right, up, left, down]

let map = map_grid.MapGrid()
let current_position = {x: 0, y: 0}
let current_direction
let current_distance = 0

let wall = {}

function move(direction) {
    current_direction = direction
    input.push(direction.command)
}

function moved(direction) {
    return {
        x: current_position.x + direction.dx,
        y: current_position.y + direction.dy
    }
}

let input = []

function explore_new_field() {
    for (let direction of shuffled_array(directions)) {
        let value = map.get(moved(direction))
        if (value === undefined) {
            move(direction)
            return true
        }
    }
}

function backtrack() {
    for (let direction of shuffled_array(directions)) {
        let value = map.get(moved(direction))
        if (value !== wall) {
            move(direction)
            return true
        }
    }
}

function next_step() {
    if (explore_new_field()) return
    if (backtrack()) return
    throw Error('Stuck at ' + current_position.x + '/' + current_position.y)
}

function handle_output(value) {
    switch (value) {
        case 0:
            map.set(moved(current_direction), wall)
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
        map.write_to_console(value => {
            switch(value) {
                case undefined:
                    return ' '
                case wall:
                    return '#'
                default:
                    return String.fromCodePoint('0'.codePointAt(0) + (value % 10))
            }
        })
        console.log(current_position)
        console.log(current_distance)
        console.log()
        process.exit(0)
    }
    next_step()
}

let machine = intcode.Intcode_from_file(
    './input.txt',
    () => input.shift(),
    handle_output)

map.set(current_position, 0)
move(up)

machine.run()
