import {occupied} from './constants.js'

export function countImmediateNeighbors(grid) {
    return function (centerX, centerY) {
        let result = 0
        forNeighboringFields(centerX, centerY, (x, y) => {
            if (grid.inside(x, y) && grid.get(x, y) === occupied) {
                ++result
            }
        })
        return result
    }
}

function forNeighboringFields(centerX, centerY, callback) {
    for (let x = centerX - 1; x <= centerX + 1; ++x) {
        for (let y = centerY - 1; y <= centerY + 1; ++y) {
            if (x !== centerX || y !== centerY) {
                callback(x, y)
            }
        }
    }
}
