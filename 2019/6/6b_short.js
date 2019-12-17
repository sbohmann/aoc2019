const fs = require('fs')

let bodies = new Set()
let neighbors = new Map()

function add_neighbor(body, neighbor) {
    let set_of_neighbors = neighbors.get(body) || new Set()
    set_of_neighbors.add(neighbor)
    neighbors.set(body, set_of_neighbors)
}

fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .filter(line => line.length !== 0)
    .forEach(line => {
        let split = line.split(')')
        bodies.add(split[1])
        add_neighbor(split[0], split[1])
        add_neighbor(split[1], split[0])
    })

let end = neighbors.get('SAN').values().next().value
let sum = 1
let visited = new Set()
let next = neighbors.get(neighbors.get('YOU').values().next().value)
while (!next.has(end)) {
    ++sum
    let new_next = new Set()
    next.forEach(body => neighbors.get(body).forEach(neighbor => new_next.add(neighbor)))
    next = new_next
}

console.log(sum)
