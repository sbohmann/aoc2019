const fs = require('fs')

let input = fs.readFileSync('input.txt', 'utf8')

let lines = input
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length !== 0)

let orbiters = new Set()
let direct_orbits = new Map()

function process_line(line) {
    let {center, orbiter} = split_line(line)
    orbiters.add(orbiter)
    add_direct_orbit(center, orbiter)
}

function add_direct_orbit(center, orbiter) {
    let existing_center = direct_orbits.get(orbiter)
    if (existing_center) {
        throw Error('Attempting to overwrite existing center [' + existing_center + ']' +
        'of orbiter [' + orbiter + '] with [' + center + ']')
    }
    direct_orbits.set(orbiter, center)
}

function split_line(line) {
    let parts = line.split(')')
    if (parts.length !== 2) {
        throw Error('Illegal line: [' + line + ']')
    }
    return {
        center: parts[0],
        orbiter: parts[1]
    }
}

lines.forEach(process_line)

let sum = 0

for (let orbiter of orbiters) {
    let counter = orbiter
    while (true) {
        counter = direct_orbits.get(counter)
        if (counter) {
            ++sum
        } else {
            break
        }
    }
}

console.log(sum)
