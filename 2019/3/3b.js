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
    let accumulated_length = 0
    let marked = new Set()
    for (let step of line.split(',')) {
        let {dx, dy} = read_direction(step)
        let length = read_length(step)
        for (let index = 0; index < length; ++index) {
            position = moved(position, dx, dy)
            ++accumulated_length
            let key = position_key(position)
            if (!marked.has(key)) {
                mark(position, key, accumulated_length)
                marked.add(key)
            }
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

function mark(position, key, length) {
    let value = field.get(key)
    if (!value) {
        value = {
            num: 1,
            length: length
        }
    } else {
        ++value.num
        value.length += length
    }
    field.set(key, value)
    if (value.num === 2) {
        process_candidate(position, value.length)
    }
}

let result

function process_candidate(position, length) {
    if (result) {
        if (length === result.length) {
            throw Error('Found equal lengths of ' + length + ' for positions ' + result.position + ' and ' + position)
        }
        if (length > result.length) {
            return
        }
    }
    result = {
        position: position,
        length: length
    }
}

let lines = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
// let lines = [
//     'R8,U5,L5,D3',
//     'U7,R6,D4,L4'
// ]
// let lines = [
//     'R75,D30,R83,U83,L12,D49,R71,U7,L72',
//     'U62,R66,U55,R34,D71,R55,D58,R83'
// ]
// let lines = [
//     'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
//     'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
// ]
process(lines[0])
process(lines[1])
console.log(result)
