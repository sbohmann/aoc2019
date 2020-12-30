import {empty, floor, occupied} from './constants.js'
import {readLines} from '../../common/io.js'

export let width = 0
export let height = 0

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

export let initialData
export let visual

if (process.argv.length > 2 && process.argv[2] === 'test') {
    initialData = [
        'L.LL.LL.LL',
        'LLLLLLL.LL',
        'L.L.L..L..',
        'LLLL.LL.LL',
        'L.LL.LL.LL',
        'L.LLLLL.LL',
        '..L.L.....',
        'LLLLLLLLLL',
        'L.LLLLLL.L',
        'L.LLLLL.LL'
    ].flatMap(parseLine)
    visual = true
} else {
    initialData = readLines('input.txt')
        .flatMap(parseLine)
    visual = false
}
