import termkit from 'terminal-kit'
import {empty, floor, occupied} from './constants.js'

const term = termkit.Terminal()

export default function Visualization(grid) {
    function print() {
        for (let y = 0; y < grid.height; ++y) {
            for (let x = 0; x < grid.width; ++x) {
                term.moveTo(x + 1, y + 1)
                switch (grid.get(x, y)) {
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

    return {
        print,
    }
}
