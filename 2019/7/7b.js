let fs = require('fs')
let intcode = require('../intcode/intcode')

let create_machine = (input, output) => new intcode.Intcode_from_file('input.txt', input, output)

function value_for_configuration(phase_settings) {
    let result = 0
    let machines = []
    for (let index = 0; index < 5; ++index) {
        let input = [phase_settings[index], result]
        machines.push(create_machine(
            () => {
                return input.shift()
            },
            value => (result = value)))
    }
    // TODO run machines as coroutines
    return result
}

function phase_settings_for_configuration(configuration) {
    let result = []
    for (let index = 0; index < 5; ++index) {
        result.push(configuration % 5)
        configuration = Math.trunc(configuration / 5)
    }
    return result;
}

let maximum = 0
let maximum_phase_settings

for (let configuration = 0; configuration < Math.pow(5, 5); ++configuration) {
    let phase_settings = phase_settings_for_configuration(configuration)
    if (!unique_phases(phase_settings)) {
        continue
    }
    let result = value_for_configuration(phase_settings)
    if (result > maximum) {
        maximum = result
        maximum_phase_settings = phase_settings
    }
}

function unique_phases(phase_settings) {
    let set = new Set(phase_settings)
    return set.size === 5
}

console.log('Maximum: ' + maximum + ' for phase settings ' + maximum_phase_settings)
