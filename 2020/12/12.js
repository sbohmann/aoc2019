import {readLines} from '../../common/io.js'
import {SimpleNavigation} from './simpleNavigation.js'
import {WaypointNavigation} from './waypointNavigation.js'

function readInstructions() {
    function parseLine(line) {
        let match = line.match(/([NSEWLRF])(\d+)/)
        let argument = Number(match[2])
        switch (match[1]) {
            case 'N':
                return navigation => navigation.moveNorth(argument)
            case 'S':
                return navigation => navigation.moveSouth(argument)
            case 'E':
                return navigation => navigation.moveEast(argument)
            case 'W':
                return navigation => navigation.moveWest(argument)
            case 'L':
                return navigation => navigation.turnLeft(argument)
            case 'R':
                return navigation => navigation.turnRight(argument)
            case 'F':
                return navigation => navigation.moveForward(argument)
            default:
                throw new Error()
        }
    }

    if (process.argv.length > 2 && process.argv[2] === 'test') {
        return ['F10', 'N3', 'F7', 'R90', 'F11']
            .map(parseLine)
    } else {
        return readLines('input.txt')
            .map(parseLine)
    }
}

let instructions = readInstructions()

function solve(context, navigation) {
    instructions.forEach(move => move(navigation))

    let [x, y] = navigation.location

    console.log(context + ':', Math.abs(x) + Math.abs(y))
}

solve('A', SimpleNavigation())

// solve('B', WaypointNavigation())
