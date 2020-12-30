import {occupied} from './constants.js'

export function Grid(initialData, width, height) {
    let data = Array.from(initialData)

    let buffer = Array.from(data)
    buffer.modified = false

    return {
        inside: (x, y) => x >= 0 && x < width && y >= 0 && y < height,

        get: (x, y) => data[y * width + x],

        set(x, y, value) {
            buffer[y * width + x] = value
            buffer.modified = true
        },

        refresh() {
            data.splice(0, data.length, ...buffer)
            buffer.modified = false
        },

        get modified() {
            return buffer.modified
        },

        get width() {
            return width
        },

        get height() {
            return height
        },

        get numberOfOccupiedSeats() {
            return data.reduce((sum, value) => (value === occupied ? sum + 1 : sum), 0)
        }
    }
}
