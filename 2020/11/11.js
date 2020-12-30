import Visualization from './visualization.js'
import {empty, occupied} from './constants.js'
import {Grid} from './grid.js'
import {height, initialData, visual, width} from './input.js'
import {countImmediateNeighbors} from './immediateNeighbors.js'
import {countVisibleNeighbors} from './visibleNeighbors.js'

function solve(context, createCountNeighbors, neighborThreshold, result, finished) {
    let grid = Grid(initialData, width, height)
    let visualization = visual ? Visualization(grid) : null

    let countNeighbors = createCountNeighbors(grid)

    function step() {
        applyRules()
        if (grid.modified) {
            grid.refresh()
            if (visualization) visualization.print()
            next()
        } else {
            result(grid.numberOfOccupiedSeats)
            finished()
        }
    }

    function applyRules() {
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                let neighbors = countNeighbors(x, y)
                if (grid.get(x, y) === empty && neighbors === 0) {
                    grid.set(x, y, occupied)
                } else if (grid.get(x, y) === occupied && neighbors >= neighborThreshold) {
                    grid.set(x, y, empty)
                }
            }
        }
    }

    function next() {
        setTimeout(step, visual ? 250 : 0)
    }

    next()
}

let a, b

function report() {
    console.log('\n')
    console.log('A:', a)
    console.log('B:', b)
}

solve('A', countImmediateNeighbors, 4, result => a = result,
    () => solve('B', countVisibleNeighbors, 5, result => b = result, report))
