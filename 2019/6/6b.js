const fs = require('fs')

let input = fs.readFileSync('input.txt', 'utf8')

let lines = input
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length !== 0)

let bodies = new Set()
let neighbors = new Map()

function process_line(line) {
    let {center, orbiter} = split_line(line)
    bodies.add(orbiter)
    add_neighbor(center, orbiter)
    add_neighbor(orbiter, center)
}

function add_neighbor(body, neighbor) {
    let set_of_neighbors = neighbors.get(body)
    if (!set_of_neighbors) {
        set_of_neighbors = new Set()
    } else if (set_of_neighbors.has(neighbor)) {
        throw Error('Attempting to add existing neighbor [' + neighbor + ']' +
            'of [' + body + ']')
    }
    set_of_neighbors.add(neighbor)
    neighbors.set(body, set_of_neighbors)
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

function single_neighbor(body) {
    let set_of_neighbors = neighbors.get(body)
    if (set_of_neighbors.size !== 1) {
        throw new Error('Unexpected number of neighbors [' + set_of_neighbors.size + '] for body [' + body + ']')
    }
    return set_of_neighbors.values().next().value
}

let start = single_neighbor('YOU')
let end = single_neighbor('SAN')
let sum = 0

if (start !== end) {
    let visited = new Set()
    let next = neighbors.get(start)

    while (true) {
        ++sum
        if (next.has(end)) {
            break
        }
        let new_next = new Set()
        next.forEach(body => neighbors.get(body).forEach(neighbor => new_next.add(neighbor)))
        next = new_next
    }
}

console.log(sum)
