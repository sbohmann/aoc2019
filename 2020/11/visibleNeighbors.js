import {empty, occupied} from './constants.js'

export function countVisibleNeighbors(grid) {
    const directions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]

    return function (centerX, centerY) {
        let result = 0

        for (let [dx, dy] of directions) {
            let [x, y] = [centerX, centerY]

            function step() {
                [x, y] = [x + dx, y + dy]
            }

            function processValue(value) {
                if (value === occupied) {
                    ++result
                    return true
                } else if (value === empty) {
                    return true
                }
            }

            step()
            while (grid.inside(x, y)) {
                let value = grid.get(x, y)
                if (processValue(value)) {
                    break
                }
                step()
            }
        }
        return result
    }
}
