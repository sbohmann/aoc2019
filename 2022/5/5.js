const fs = require('fs')
const {TabularText} = require('../../common/tabularText.js')
const {matchOrFail} = require('../../common/regex')

let input =
    fs.readFileSync('input.txt', 'utf-8')
        .split('\n\n')

if (input.length !== 2) {
    throw new RangeError
}

let table = TabularText(input[0], 4)
let stacks = readStacks()

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

let commandLines = input[1].split('\n')
for (let index = 0; index < commandLines.length; ++index) {
    let line = commandLines[index]
    if (line === '') {
        continue
    }
    let lineNumber = table.height + 2 + index
    let command = parseCommand(line)
    executeCommand(command, lineNumber)
}

let result5a = [...stacks.keys()]
    .sort()
    .map(key => stacks.get(key))
    .map(stack => {
        return stack[stack.length - 1]
    })
    .join('')

console.log(result5a)

function parseCommand(line) {
    let match = matchOrFail(line, /move (\d+) from (\d+) to (\d+)/)
    return {
        number: Number(match[1]),
        source: Number(match[2]),
        destination: Number(match[3])
    }
}

function executeCommand(command, lineNumber) {
    for (let index = 0; index < command.number; ++index) {
        let element = stacks.get(command.source).pop()
        if (element === undefined) {
            throw new RangeError(`Attempt to pop element from empty stack at line ${lineNumber}`)
        }
        stacks.get(command.destination).push(element)
    }
}
