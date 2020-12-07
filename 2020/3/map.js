export default function Map(lines) {
    let width
    let rows

    function init() {
        rows = lines
            .map(readRow)
        let lengths = rowLengths(rows)
        if (lengths.size !== 1) {
            throw new Error("Rows have different lengths")
        }
        width = lengths.values().next().value
    }

    function readRow(line) {
        return Array.from(line).map(interpretCharacter)
    }

    function interpretCharacter(value) {
        switch (value) {
            case '.':
                return false
            case '#':
                return true
            default:
                throw new Error('Unsupported map character [' + value + ']')
        }
    }

    function rowLengths(rows) {
        return new Set(rows.map(row => row.length))
    }

    function normalize(x) {
        let result = x % width
        if (result < 0) {
            result += width
        }
        return result
    }

    init()

    return {
        tree(x, y) {
            x = normalize(x)
            return rows[y][x]
        },
        get width() { return width },
        get height() { return rows.length}
    }
}
