let intcode = require('../intcode/intcode')

let map = new Map()
let bounds = {
    minx: 0,
    miny: 0,
    maxx: 0,
    maxy: 0
}
let painted = new Set()

function extend_bounds(x, y) {
    if (x < bounds.minx) {
        bounds.minx = x
    }
    if (y < bounds.miny) {
        bounds.miny = y
    }
    if (x > bounds.maxx) {
        bounds.maxx = x
    }
    if (y > bounds.maxy) {
        bounds.maxy = y
    }
}

function create_key(position) {
    return position.x + ',' + position.y
}

function get(position) {
    let result = map.get(create_key(position))
    return result !== undefined ? result : false
}

function set(position, value) {
    let key = create_key(position)
    map.set(key, value)
    painted.add(key)
    extend_bounds(position.x, position.y)
}


let position = {x: 0, y: 0}
let direction = {x: 0, y: -1}
set(position, true)
let input = [get(position)]
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
        set(position, is_white(color))
        turn(turn_direction)
        step()
        input.push(get(position))
    }
}

intcode.Intcode_from_file(
    'input.txt',
    () => input.shift() ? 1 : 0,
    handle_output)
    .run()

for (let y = bounds.miny; y <= bounds.maxy; ++y) {
    let line = ''
    for (let x = bounds.minx; x <= bounds.maxx; ++x) {
        line += get({x: x, y: y}) ? '#' : ' '
    }
    console.log(line)
}
console.log(painted.size)
