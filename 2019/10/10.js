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
        set(x, y, lines[y][x] === '#')
    }
}

function angle(dx, dy) {
    if (dx === 0 && dy === 0) {
        throw Error()
    } else if (dx === 0) {
        return '0,' + Math.sign(dy)
    } else if (dy === 0) {
        return Math.sign(dx) + ',0'
    }
    let maximum = Math.trunc(Math.min(Math.abs(dx), Math.abs(dy)) / 2)
    for (let factor = 2; factor <= maximum; ++factor) {
        if (dx % factor === 0 && dy % factor === 0) {
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
            if (x === xpos && y === ypos) {
                continue
            }
            angles.add(angle(x - xpos, y - ypos))
        }
    }
    return angles.size
}

let maximum_visible_asteroids
let optimal_coordinates

for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
        let result = visible_asteroids(x, y)
        if (maximum_visible_asteroids === undefined || result > maximum_visible_asteroids) {
            maximum_visible_asteroids = result
            optimal_coordinates = {x: x, y: y}
        }
    }
}

console.log(maximum_visible_asteroids)
console.log(optimal_coordinates)
