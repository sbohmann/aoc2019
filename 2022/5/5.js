const fs = require('fs')
const {TabularText} = require('../../common/tabularText.js')

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
for (let mapLineIndex = 0; mapLineIndex < mapHeight; ++mapLineIndex) {
    const line = mapLines[mapLineIndex]
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

let table = TabularText(input[0], 4)
console.log(table)
for (let y = 0; y < table.height; ++y) {
    for (let x = 0; x < table.width; ++x) {
        console.log(`[${table.get(x, y)}]`)
    }
}
