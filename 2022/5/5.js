const fs = require('fs')

let input =
    fs.readFileSync('input.txt', 'utf-8')
        .split('\n\n')

if (input.length !== 2) {
    throw new RangeError
}

let map = input[0].split('\n')
let mapHeight = map.length - 1
let columnsLineMatch = map[mapHeight].match(/( *\d+ *)/)
if (!columnsLineMatch) {
    throw new RangeError()
}
let columnMatches = map[mapHeight].matchAll(/\d+/)
let numberOfColumns = 0
for (let match of columnMatches) {
    ++numberOfColumns
}

console.log(numberOfColumns)
