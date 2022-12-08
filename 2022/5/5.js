const fs = require('fs')

let input =
    fs.readFileSync('input.txt', 'utf-8')
        .split('\n\n')

if (input.length !== 2) {
    throw new RangeError
}

let mapLines = input[0].split('\n')
let mapHeight = mapLines.length - 1
let columnsLine = mapLines[mapHeight]
let columnMatches = columnsLine.matchAll(/ *(\d+)/g)
let numberOfColumns = [...columnMatches].length

console.log(numberOfColumns)

let map = []
for (let maoLineIndex = 0; maoLineIndex < mapHeight; ++maoLineIndex) {
    const line = mapLines[maoLineIndex]
    const columnsInLine = (line.length + 1) / 4
    let row = []
    for (let columnIndex = 0; columnIndex < columnsInLine; ++columnIndex) {
        let columnStart = columnIndex * 4
        let columnMatch = line
            .substring(columnStart, columnStart + 3)
            .match(/\[([A-Z])]/)
        if (columnMatch) {
            row.push(columnMatch[1])
        } else {
            row.push(null)
        }
    }
    map.push(row)
}

console.log(map)
