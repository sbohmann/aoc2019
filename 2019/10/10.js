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
    return dx + ',' + dy
}

function visible_asteroids(xpos, ypos) {
    let angles = new Set()
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            if (x === xpos && y === ypos || !get(x, y)) {
                continue
            }
            angles.add(calculate_angle(x - xpos, y - ypos))
        }
    }
    return angles
}

let maximum_visible_asteroids
let optimal_coordinates

for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
        if (get(x, y)) {
            let result = visible_asteroids(x, y)
            if (maximum_visible_asteroids === undefined || result.size > maximum_visible_asteroids) {
                maximum_visible_asteroids = result.size
                optimal_coordinates = {x: x, y: y}
            }
        }
    }
}

console.log(maximum_visible_asteroids)
console.log(maximum_visible_asteroids.size)
console.log(optimal_coordinates)
