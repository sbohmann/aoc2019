import {directions, east, north, south, turnDirectionIndex, west} from './directions.js'

export function WaypointNavigation() {
    let directionIndex = 0
    let x = 0, y = 0

    function moveBy(dx, dy, distance) {
        x += distance * dx
        y += distance * dy
    }

    function turnBy(angle) {
        directionIndex = turnDirectionIndex(directionIndex, angle)
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
        moveForward(distance) {
            moveBy(...directions[directionIndex], distance)
        },
        get location() {
            return [x, y]
        }
    }
}
