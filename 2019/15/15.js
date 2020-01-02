const DEBUG = false

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

let result_a

function moved(position, direction) {
    return {
        x: position.x + direction.dx,
        y: position.y + direction.dy
    }
}

function equal(a, b) {
    return a.x === b.x && a.y === b.y
}

function known_accessible(position) {
    return Number.isInteger(map.get(position))
}

let unvisited = (function () {
    const set = new Set()
    return {
        add: position => {
            set.add(map.create_key(position))
        },
        delete: position => {
            set.delete(map.create_key(position))
        },
        has: position => set.has(map.create_key(position)),
        size: () => set.size
    }
})()

directions.forEach(direction => unvisited.add(moved(current_position, direction)))

let input = []
let path = []

function value_to_character(value) {
    switch (value) {
        case undefined:
            return ' '
        case wall:
            return '·'
        default:
            return String.fromCodePoint('0'.codePointAt(0) + (value % 10))
    }
}

function calculate_path(search_map, goal) {
    let result = [goal]
    let position = goal
    while (true) {
        let minimum
        let next_position
        directions.forEach(direction => {
            let candidate_position = moved(position, direction)
            let candidate_value = search_map.get(candidate_position)
            if (candidate_value !== undefined) {
                if (minimum === undefined || candidate_value < minimum) {
                    next_position = candidate_position
                    minimum = candidate_value
                }
            }
        })
        if (next_position === undefined) {
            throw Error('Path creation failed at path ' + path_number)
        }
        if (minimum === 0) {
            result.reverse()
            return result
        }
        position = next_position
        result.push(next_position)
    }
}

function calculate_path_to_closest_unvisited() {
    if (unvisited.size() === 0) {
        console.log('Map exhausted.')
        if (result_a) {
            result_a()
        }
        process.exit(0)
    } else {
        let search_map = map_grid.MapGrid(undefined)
        let next = new Set([current_position])
        let distance = 0
        while (next.size > 0) {
            let new_next = new Set()
            for (let position of next) {
                search_map.set(position, distance)
                for (let direction of directions) {
                    let neighbor = moved(position, direction)
                    if (unvisited.has(neighbor)) {
                        return calculate_path(search_map, neighbor)
                    }
                    if (search_map.get(neighbor) === undefined && known_accessible(neighbor)) {
                        new_next.add(neighbor)
                    }
                }
            }
            next = new_next
            ++distance
        }
        throw Error('Exhausted search without finding an unvisited position at path ' + path_number)
    }
}

function next_step() {
    if (path.length === 0) {
        path = calculate_path_to_closest_unvisited()
    }
    let next_position = path.shift()
    for (let direction of directions) {
        if (equal(moved(current_position, direction), next_position)) {
            input.push(direction.command)
            current_direction = direction
            unvisited.delete(moved(current_position, direction))
            return
        }
    }
    throw Error('Next position [' + map.create_key(next_position + '] not neighboring current position [' +
        map.create_key(current_position) + ']'))
}

function calculate_saturation_time(start) {
    let search_map = map_grid.MapGrid(undefined)
    let next = new Set([start])
    let distance = 0
    while (next.size > 0) {
        let new_next = new Set()
        for (let position of next) {
            search_map.set(position, distance)
            for (let direction of directions) {
                let neighbor = moved(position, direction)
                if (search_map.get(neighbor) === undefined && known_accessible(neighbor)) {
                    new_next.add(neighbor)
                }
            }
        }
        next = new_next
        ++distance
    }
    if (DEBUG) {
        search_map.write_to_console(value_to_character)
    }
    console.log('15b: ' + (distance - 1))
}

function show_map() {
    if (DEBUG) {
        console.log('\n')
        map.write_to_console(value_to_character)
        console.log('\n')
    }
}

function handle_output(value) {
    switch (value) {
        case 0:
            map.set(moved(current_position, current_direction), wall)
            show_map()
            break
        case 1:
        case 2:
            current_position = moved(current_position, current_direction)
            directions
                .map(direction => moved(current_position, direction))
                .filter(position => map.get(position) === undefined)
                .forEach(position => unvisited.add(position))
            let distance = map.get(current_position)
            if (distance === undefined || current_distance + 1 < distance) {
                ++current_distance
                map.set(current_position, current_distance)
                show_map()
            } else {
                current_distance = distance
            }
            break
        default:
            throw Error()
    }
    if (value === 2 && result_a === undefined) {
        let distance = current_distance
        let position = current_position
        result_a = () => {
            map.write_to_console(value_to_character)
            console.log('15a: ' + distance)
            console.log(position)
            calculate_saturation_time(position)
        }
    }
    next_step()
}

let machine = intcode.Intcode_from_file(
    './input.txt',
    () => input.shift(),
    handle_output)

map.set(current_position, 0)
next_step()

machine.run()
