export const east = [1, 0]
export const south = [0, 1]
export const west = [-1, 0]
export const north = [0, -1]
export const directions = [east, south, west, north]

export function turnDirectionIndex(directionIndex, angle) {
    let steps = angleToSteps(angle)
    return modulo(
        directionIndex + steps,
        directions.length)
}

export function angleToSteps(angle) {
    let result = angle / 90
    if (!Number.isInteger(result)) {
        throw new Error()
    }
    return result
}

export function modulo(value, module) {
    return [value % module + module] % module
}
