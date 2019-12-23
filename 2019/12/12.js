let fs = require('fs')

let moons

function read_moons() {
    moons = fs.readFileSync('input.txt', 'utf8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            let match = line.match(/^<x=(-?\d+), y=(-?\d+), z=(-?\d+)>$/)
            if (match === null) {
                throw Error('Unable to parse line [' + line + ']')
            }
            return {
                x: Number(match[1]),
                y: Number(match[2]),
                z: Number(match[3]),
                vx: 0,
                vy: 0,
                vz: 0
            }
        })
}

function adjust_valocity(moon, other) {
    moon.vx += Math.sign(other.x - moon.x)
    moon.vy += Math.sign(other.y - moon.y)
    moon.vz += Math.sign(other.z - moon.z)
}

function adjust_velocities() {
    for (let moon of moons) {
        for (let other of moons) {
            if (other !== moon) {
                adjust_valocity(moon, other)
            }
        }
    }
}

function adjust_positions() {
    for (let moon of moons) {
        moon.x += moon.vx
        moon.y += moon.vy
        moon.z += moon.vz
    }
}

function a() {
    console.log('A')
    read_moons()

    for (let index = 0; index < 1000; ++index) {
        adjust_velocities()
        adjust_positions()
    }

    let sum = 0
    for (let moon of moons) {
        console.log(moon)
        let potential_energy = Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z)
        let kinetic_energy = Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz)
        sum += potential_energy * kinetic_energy
    }
    console.log(sum)
}

function b() {
    console.log('B')
    read_moons()

    const coordinates = ['x', 'y', 'z']
    let states_for_coordinate = {
        'x': new Set(),
        'y': new Set(),
        'z': new Set()
    }
    let missing = new Set(coordinates)
    let period_for_coordinate = new Map()

    function build_state(coordinate) {
        let result = ''
        let first = true
        for (let moon of moons) {
            if (!first) {
                result += ';'
            }
            result += moon[coordinate]
            result += ','
            result += moon['v' + coordinate]
            first = false
        }
        return result
    }

    function handle_state(coordinate, rounds) {
        if (missing.has(coordinate)) {
            let states = states_for_coordinate[coordinate]
            let state = build_state(coordinate)
            if (states.has(state)) {
                console.log(coordinate + ' state ' + state)
                console.log('Reached after ' + rounds + ' rounds')
                missing.delete(coordinate)
                period_for_coordinate.set(coordinate, rounds)
            }
            states.add(state)
        }
    }

    for (let index = 0; missing.size > 0; ++index) {
        adjust_velocities()
        adjust_positions()
        coordinates.forEach(coordinate => handle_state(coordinate, index + 1))
    }

    let periods = Array.from(period_for_coordinate, ([_, value]) => value)

    console.log(periods)

    let maximum_denominator = Math.trunc(periods.reduce((previous, current) => Math.max(previous, current)) / 2)
    function divides_all(n) {
        for (let value of periods) {
            if (value % n !== 0) {
                return false
            }
        }
        return true
    }

    for (let n = 2; n < maximum_denominator; ++n) {
        while (divides_all(n)) {
            periods = periods.map(value => value / n)
        }
    }

    console.log(periods)
    let least_common_multiple = periods.reduce((previous, current) => previous * current)
    periods.forEach(value => console.log(least_common_multiple / value))
    console.log(least_common_multiple)
}

a()
b()
