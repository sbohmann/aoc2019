let formulae = require('./formulae')

function is_created_from(output, source) {
    let output_production = formulae.productions.get(output)
    if (output_production === undefined) {
        return false
    }
    for (let input of output_production.input) {
        if (input.element === source) {
            return true
        }
    }
    for (let input of output_production.input) {
        if (is_created_from(input.element, source)) {
            return true
        }
    }
}

let remaining_elements = new Set(formulae.elements)

let result = []

function matches(candidate) {
    for (let element of remaining_elements) {
        if (element !== candidate && is_created_from(element, candidate)) {
            return false
        }
    }
    return true
}

function add_matching_element() {
    for (let element of remaining_elements) {
        if (matches(element)) {
            result.push(element)
            remaining_elements.delete(element)
            return
        }
    }
    throw new Error('No matching element available')
}

while (remaining_elements.size > 0) {
    add_matching_element()
}

module.exports = result
