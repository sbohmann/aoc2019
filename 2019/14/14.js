const formulae = require('./formulae')
const elements = require('./ordered_elements')

console.log(elements)

function ore_required_for_fuel(output_quantity) {
    let minimum_production = new Map()
    minimum_production.set('FUEL', output_quantity)

    function get_required_production(element) {
        let value = minimum_production.get(element)
        return (value === undefined ? BigInt(0) : value)
    }

    function add_required_production(element, number) {
        let value = get_required_production(element)
        value += number
        minimum_production.set(element, value)
    }

    function steps(value, step) {
        return (value + step - BigInt(1)) / step
    }

    for (let element of elements) {
        let production = formulae.productions.get(element)
        if (production !== undefined) {
            let required_quantity = get_required_production(element)
            let number_of_productions = steps(required_quantity, BigInt(production.quantity_produced))
            required_quantity = BigInt(production.quantity_produced) * BigInt(number_of_productions)
            for (let input of production.input) {
                add_required_production(input.element, BigInt(input.number) * number_of_productions)
            }
        }
    }

    return get_required_production('ORE')
}

let ore_required_for_one_fuel = ore_required_for_fuel(BigInt(1))

console.log('14a: ' + ore_required_for_one_fuel)

let result = ore_required_for_one_fuel

const maximum = BigInt(10) ** BigInt(12)

let output_quantity = BigInt(1)

let last_result
let last_output_quantity
while (result < maximum) {
    last_result = result
    last_output_quantity = output_quantity
    output_quantity *= BigInt(2)
    result = ore_required_for_fuel(output_quantity)
}
console.log(last_result)

function binary_search_maximum(a, b) {
    if (b === a + BigInt(1)) {
        console.log('14b: ' + a)
        console.log('a: ' + ore_required_for_fuel(a))
        console.log('b: ' + ore_required_for_fuel(b))
    } else {
        let average = (a + b) / BigInt(2)
        let ore_required = ore_required_for_fuel(average)
        if (ore_required > maximum) {
            binary_search_maximum(a, average)
        } else {
            binary_search_maximum(average, b)
        }
    }
}

binary_search_maximum(last_output_quantity, output_quantity)
