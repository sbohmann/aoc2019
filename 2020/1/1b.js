import {readLines} from '../../common/io.js'
import {GroupIterator} from './group_iterator.js'

function solve() {
    // let input = [1721, 979, 366, 299, 675, 1456]
    let input = readInput()
    let result = undefined
    forEachGroup(3, input, group => {
        let sum = group.reduce((lhs, rhs) => lhs + rhs)
        if (sum === 2020) {
            if (result) {
                throw new Error('Found multiple results')
            }
            result = group.reduce((lhs, rhs) => lhs * rhs)
        }
    })
    console.log(result)
}

function readInput() {
    return readLines('input.txt')
        .map(Number)
}

export function forEachGroup(groupSize, data, action) {
    let iterator = GroupIterator(data, groupSize)
    do {
        action(iterator.get())
    } while (iterator.next())
}

solve()
