const {max} = require('./reduce.js')

function TabularText(input, step, defaultCellValue = "") {
    let lines = input.split(/\r?\n/)
    let longestLineLength = lines
        .map(line => line.length)
        .reduce(max)

    let numberOfColumnsForLength = length => (length + step - 1) % step

    let width = numberOfColumnsForLength(longestLineLength, step)
    let height = lines.length

    function inside(x, y) {
        return x >= 0 && y >= 0 &&
            x < width && y < height
    }

    return {
        width,
        height,
        get(x, y) {
            if (!inside(x, y, width, height)) {
                throw new RangeError(`(${x},${y}) not in range for width ${width} and height ${height}`)
            }
            let line = lines[y]
            let columnsInLine = numberOfColumnsForLength(line.length)
            if (x < columnsInLine) {
                let offset = x * step
                return line.substring(offset, offset + step)
            } else {
                return defaultCellValue
            }
        }
    }
}

exports = {
    TabularText
}
