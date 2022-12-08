const fs = require('fs')
const {TabularText} = require('../../common/tabularText.js')

let input =
    fs.readFileSync('input.txt', 'utf-8')
        .split('\n\n')

if (input.length !== 2) {
    throw new RangeError
}

let table = TabularText(input[0], 4)
let stacks = readStacks()
console.log(stacks)

function readStacks() {
    let result = new Map()
    let columnNumberRow = table.height - 1
    for (let x = 0; x < table.width; ++x) {
        let columnNumber = Number(table.get(x, columnNumberRow).trim())
        let stack = parseColumn(x)
        result.set(columnNumber, stack)
    }
    return result
}

function parseColumn(x) {
    let stack = []
    let foundEmptyCell = false
    for (let y = table.height - 2; y >= 0; --y) {
        let cellValue = table.get(x, y)
        let cellValueMatch = cellValue.match(/\[([A-Z])]/)
        if (cellValueMatch) {
            if (foundEmptyCell) {
                throw new RangeError(`Unexpected continuation of column at (${x},${y})`)
            }
            stack.push(cellValueMatch[1])
        } else {
            if (cellValue.trim() !== '') {
                throw new RangeError(`Unrecognized non-empty cell value [${cellValue}] at column at (${x},${y})`)
            }
            foundEmptyCell = true
        }
    }
    return stack
}
