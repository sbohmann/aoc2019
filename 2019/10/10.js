let fs = require('fs')

let lines = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

let width = lines[0].length
let height = lines.length

let grid = Array(width * height).fill(false)

function get(x, y) {
    return grid[y * width + x]
}

function set(x, y) {
    grid[y * width + x] = true
}

for (let y = 0; y < height; ++y) {
    if (lines[y].length !== width) {
        throw Error()
    }
    for (let x = 0; x < width; ++x) {
        if (lines[y][x] === '#') {
            set(x, y, lines[y][x] === '#')
        }
    }
}

function calculate_angle(dx, dy) {
    let maximum = Math.max(Math.abs(dx), Math.abs(dy))
    for (let factor = 2; factor <= maximum; ++factor) {
        while (dx % factor === 0 && dy % factor === 0) {
            dx /= factor
            dy /= factor
            if (!Number.isInteger(dx) || !Number.isInteger(dy)) {
                throw Error()
            }
        }
    }
    return {
        dx: dx,
        dy: dy
    }
}

function visible_asteroids(xpos, ypos) {
    let angles = new Set()
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            if (x === xpos && y === ypos || !get(x, y)) {
                continue
            }
            let angle = calculate_angle(x - xpos, y - ypos)
            angles.add(angle.dx + ',' + angle.dy)
        }
    }
    return angles
}

let maximum_visible_asteroids
let center

for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
        if (get(x, y)) {
            let result = visible_asteroids(x, y)
            if (maximum_visible_asteroids === undefined || result.size > maximum_visible_asteroids.size) {
                maximum_visible_asteroids = result
                center = {x: x, y: y}
            }
        }
    }
}

console.log(maximum_visible_asteroids.size)
console.log(center)

let directions = []
let added_directions = new Set()
let positions = new Map()

function create_position(x, y) {
    let delta_x = x - center.x
    let delta_y = y - center.y
    let angle = calculate_angle(delta_x, delta_y)
    let theta = Math.atan2(angle.dx, -angle.dy)
    if (theta < 0) {
        theta += 2 * Math.PI
    }
    return {
        theta: theta,
        distance: Math.abs(delta_x + delta_y),
        x: x,
        y: y
    }
}

function add_position(position) {
    let list = positions.get(position.theta)
    if (list === undefined) {
        list = [position]
    } else {
        list.push(position)
    }
    positions.set(position.theta, list)
}

for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
        if ((x !== center.x || y !== center.y) && get(x, y)) {
            let position = create_position(x, y)
            add_position(position)
            if (!added_directions.has(position.theta)) {
                directions.push(position.theta)
                added_directions.add(position.theta)
            }
        }
    }
}

directions.sort((a, b) => a - b)

for (let theta of directions) {
    positions.get(theta).sort((a, b) => a.distance - b.distance)
}

let index = 0
let result
for (let round = 1; round <= 200; ++round) {
    while (true) {
        let theta = directions[index]
        ++index
        let list = positions.get(theta)
        if (list.size !== 0) {
            result = list.shift()
            console.log(result)
            break
        }
    }
}

console.log(result)
