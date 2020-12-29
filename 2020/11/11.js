import termkit from 'terminal-kit'
import {readLines} from '../../common/io.js'

const term = termkit.Terminal()

const floor = {}, empty = {}, occupied = {}

let width = 0
let height = 0

function parseLine(line) {
    width = line.length
    ++height
    return Array.from(line).map(character => {
        switch (character) {
            case '.':
                return floor
            case 'L':
                return empty
            case '#':
                return occupied
            default:
                throw new Error(character)
        }
    })
}

function solve(context, createCountNeighbors, neighborThreshold, outputOffset) {
    // let grid = [
    //     'L.LL.LL.LL',
    //     'LLLLLLL.LL',
    //     'L.L.L..L..',
    //     'LLLL.LL.LL',
    //     'L.LL.LL.LL',
    //     'L.LLLLL.LL',
    //     '..L.L.....',
    //     'LLLLLLLLLL',
    //     'L.LLLLLL.L',
    //     'L.LLLLL.LL'
    // ].flatMap(parseLine)
    // let visual = true

    let grid = readLines('input.txt')
        .flatMap(parseLine)
    let visual = false

    let buffer = Array.from(grid)
    buffer.modified = false

    grid.get = (x, y) => grid[y * width + x]

    buffer.set = (x, y, value) => {
        buffer[y * width + x] = value
        buffer.modified = true
    }

    grid.refresh = () => {
        grid.splice(0, grid.length, ...buffer)
        buffer.modified = false
    }

    let countNeighbors = createCountNeighbors(grid)

    function print() {
        if (!visual) return
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                term.moveTo(x + 1, y + 1)
                switch (grid[y * width + x]) {
                    case floor:
                        term.yellow('.')
                        break
                    case empty:
                        term.brightBlue('L')
                        break
                    case occupied:
                        term.brightYellow('#')
                }
            }
        }
    }

    term.clear()

    print()

    function step() {
        applyRules()
        if (buffer.modified) {
            grid.refresh()
            print()
            next()
        } else {
            term.moveTo(1, height + outputOffset)
            term.white(context + ': ', grid.reduce((sum, value) => (value === occupied ? sum + 1 : sum), 0), '\n')
        }
    }

    function applyRules() {
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                let neighbors = countNeighbors(x, y)
                if (grid.get(x, y) === empty && neighbors === 0) {
                    buffer.set(x, y, occupied)
                } else if (grid.get(x, y) === occupied && neighbors >= neighborThreshold) {
                    buffer.set(x, y, empty)
                }
            }
        }
    }

    function next() {
        setTimeout(step, visual ? 250 : 0)
    }

    next()
}

function countImmediateNeighbors(grid) {
    return function (centerX, centerY) {
        let result = 0
        for (let x = centerX - 1; x <= centerX + 1; ++x) {
            for (let y = centerY - 1; y <= centerY + 1; ++y) {
                let outOfCenter = x !== centerX || y !== centerY
                let insideGrid = x >= 0 && x < width && y >= 0 && y < height
                if (outOfCenter && insideGrid && grid.get(x, y) === occupied) {
                    ++result
                }
            }
        }
        return result
    }
}

function countVisibleNeighbors(grid) {
    const directions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]

    return function (centerX, centerY) {
        let result = 0
        for (let [dx, dy] of directions) {
            let [x, y] = [centerX, centerY]
            while (true) {
                [x, y] = [x + dx, y + dy]
                let insideGrid = x >= 0 && x < width && y >= 0 && y < height
                if (insideGrid) {
                    let visibleValue = grid.get(x, y)
                    if (visibleValue === occupied) {
                        ++result
                        break
                    } else if (visibleValue === empty) {
                        break
                    }
                } else {
                    break
                }
            }
        }
        return result
    }
}

solve('A', countImmediateNeighbors, 4, 2)

solve('B', countVisibleNeighbors, 5, 3)
