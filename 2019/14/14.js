const formulae = require('./formulae')

function naive_ore_quantity(production) {
    let result = 0
    for (let input of production.input) {
        if (input.element === 'ORE') {
            result += 1
        } else {
            let input_production = formulae.productions.get(input.element)
            result += input.number * naive_ore_quantity(input_production)
        }
    }
    return result
}

let fuel_production = formulae.productions.get('FUEL')
console.log(naive_ore_quantity(fuel_production))
