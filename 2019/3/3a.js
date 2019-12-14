let fs = require('fs')

function Position(x, y) {
    return {
        x: x,
        y: y
    }
}

function position_key(position) {
    return '(' + position.x + ',' + position.y + ')'
}

function moved(position, delta_x, delta_y) {
    return Position(position.x + delta_x, position.y + delta_y)
}

let field = new Map()

function process(line) {
    let position = Position(0, 0)
    for (let step of line.split(',')) {
        let {dx, dy} = read_direction(step)
        let length = read_length(step)
        for (let index = 0; index < length; ++index) {
            position = moved(position, dx, dy)
            mark(position)
        }
    }
}

function read_direction(step) {
    let key = step[0]
    switch (key) {
        case 'R':
            return {dx: 1, dy: 0}
        case 'U':
            return {dx: 0, dy: 1}
        case 'L':
            return {dx: -1, dy: 0}
        case 'D':
            return {dx: 0, dy: -1}
        default:
            throw RangeError('Illegal direction: ' + key)
    }
}

function read_length(step) {
    return Number(step.substr(1))
}

function mark(position) {
    let key = position_key(position)
    let value = field.get(key)
    if (!value) {
        value = 0
    }
    ++value
    field.set(key, value)
    if (value === 2) {
        process_candidate(position)
    }
}

let result

function process_candidate(position) {
    let distance = Math.abs(position.x) + Math.abs(position.y)
    if (result) {
        if (distance === result.distance) {
            throw Error('Found equal distances of ' + distance + ' for positions ' + result.position + ' and ' + position)
        }
        if (distance > result.distance) {
            return
        }
    }
    result = {
        position: position,
        distance: distance
    }
}

let lines = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
process(lines[0])
process(lines[1])
console.log(result)
