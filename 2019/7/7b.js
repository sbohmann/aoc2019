let fs = require('fs')
let intcode = require('../intcode/intcode')

let create_machine = (input, output) => new intcode.Intcode_from_file('input.txt', input, output)

function value_for_configuration(phase_settings) {
    let result = 0
    let machines = []
    let input = []
    let output = null
    for (let index = 0; index < 5; ++index) {
        input[index] = [phase_settings[index]]
        if (index === 0) {
            input[index].push(result)
        }
        machines.push(create_machine(
            () => {
                if (input[index].length === 0) {
                    throw Error('No input value available')
                }
                return input[index].shift()
            },
            value => {
                output = value
            }))
    }
    let current_machine_index = 0
    while (true) {
        let machine = machines[current_machine_index]
        if (machine === null) {
            break;
        }
        let halted = machine.step()
        if (halted) {
            machines[current_machine_index] = null
        }
        if (output !== null) {
            result = output
            console.log(output)
            current_machine_index = (current_machine_index + 1) % 5
            input[current_machine_index].push(output)
            output = null
        } else if (halted) {
            current_machine_index = (current_machine_index + 1) % 5
        }
    }
    return result
}

function phase_settings_for_configuration(configuration) {
    let result = []
    for (let index = 0; index < 5; ++index) {
        result.push(configuration % 5 + 5)
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
    console.log(phase_settings)
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
