let fs = require('fs')

function solve(fuel_for_fuel) {
    let sum = 0

    function process_line(line) {
        let mass = fuel_for_mass(Number(line))
        sum += mass
    }

    function fuel_for_mass(mass) {
        let result = Math.floor(mass / 3) - 2
        if (fuel_for_fuel) {
            if (result <= 0) {
                return 0
            } else {
                return result + fuel_for_mass(result)
            }
        } else {
            return result;
        }
    }

    let input = fs.readFileSync('input.txt', 'utf8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .forEach(process_line)

    console.log(sum)
}

function a() {
    solve(false)
}

function b() {
    solve(true)
}

a()
b()
