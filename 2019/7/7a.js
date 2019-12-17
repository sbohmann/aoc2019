let fs = require('fs')
let intcode = require('../intcode/intcode')

let create_machine = (input, output) => new intcode.Intcode_from_file('input.txt', input, output)

function value_for_configuration(configuration) {
    let phase_settings = phase_settings_for_configuration(configuration)
    let result = 0
    for (let index = 0; index < 5; ++index) {
        let input = [phase_settings[index], result]
        create_machine(
            () => {
                let result = input.shift()
            },
            value => (result = value))
            .run()
    }
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

for (let configuration = 0; configuration < Math.pow(5, 5); ++configuration) {
    console.log(value_for_configuration(configuration))
}
