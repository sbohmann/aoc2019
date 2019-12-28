const fs = require('fs')

let elements = new Set()

function parse_quantity_of_element(text) {
    let match = text.match(/(\d+) (\w+)/)
    let number = Number(match[1])
    let name = match[2]
    elements.add(name)
    return {
        number: number,
        element: name
    }
}

function parse_formula(line) {
    let input = []
    // goodness, node's regex seem to be broken -.-
    // let match = line.match(/((?:,?(?:\d+ \w+))+) => (\d+ \w+)/)
    let line_match = line.match(/(.+) => (\d+ \w+)/)
    let output = parse_quantity_of_element(line_match[2])
    let input_quantities_list = line_match[1].split(', ')
    input_quantities_list.forEach(input_quantity => {
        input.push(parse_quantity_of_element(input_quantity))
    })
    return {
        input: input,
        output: output
    }
}

let formulae = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(parse_formula)

let productions = new Map()

formulae.forEach(formula => {
    productions.set(formula.output.element, {
        quantity_produced: formula.output.number,
        input: formula.input
    })
})

exports.elements = elements
exports.formulae = formulae
exports.productions = productions
exports.print_productions = () => {
    for (let production of productions.entries()) {
        console.log(production[0])
        console.log(production[1])
    }
}
