import {angleToSteps, east, modulo, north, south, west} from './directions.js'

export function WaypointNavigation() {
    let x = 0, y = 0
    let waypointX = 10
    let waypointY = 1

    function moveBy(dx, dy, multiples) {
        x += multiples * dx
        y += multiples * dy
    }

    function turnBy(angle) {
        let steps = modulo(angleToSteps(angle), 4)
        let newWaypointX, newWaypointY
        switch (steps) {
            case 0:
                return
            case 1:
                newWaypointX = -waypointY
                newWaypointY = waypointX
                break
            case 2:
                newWaypointX = -waypointX
                newWaypointY = -waypointY
                break
            case 3:
                newWaypointX = waypointY
                newWaypointY = -waypointX
                break
            default:
                throw new Error()
        }
        [waypointX, waypointY] = [newWaypointX, newWaypointY]
    }

    return {
        moveNorth(distance) {
            moveBy(...north, distance)
        },
        moveSouth(distance) {
            moveBy(...south, distance)
        },
        moveEast(distance) {
            moveBy(...east, distance)
        },
        moveWest(distance) {
            moveBy(...west, distance)
        },
        turnLeft(angle) {
            turnBy(-angle)
        },
        turnRight(angle) {
            turnBy(angle)
        },
        moveForward(multiples) {
            moveBy(waypointX, waypointY, multiples)
        },
        get location() {
            return [x, y]
        }
    }
}
