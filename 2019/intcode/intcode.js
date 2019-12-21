let fs = require('fs')

function Intcode(raw_data, input, output) {
    let data = new Map()
    let index = 0
    let relative_base = 0

    function step() {
        let opcode = read_opcode()
        switch (opcode.command) {
            case 1:
                add(opcode.parameter_modes)
                break
            case 2:
                multiply(opcode.parameter_modes)
                break
            case 3:
                read(opcode.parameter_modes)
                break
            case 4:
                write(opcode.parameter_modes)
                break
            case 5:
                jump_if_true(opcode.parameter_modes)
                break;
            case 6:
                jump_if_false(opcode.parameter_modes)
                break;
            case 7:
                less_than(opcode.parameter_modes)
                break;
            case 8:
                equals(opcode.parameter_modes)
                break;
            case 9:
                adjust_relative_base(opcode.parameter_modes)
                break;
            case 99:
                return true
            default:
                throw RangeError("Unknown command: " + opcode.command)
        }
    }

    function read_opcode() {
        let result = data.get(index)
        if (result === undefined) {
            throw RangeError("Index out of range: " + index)
        }
        return {
            command: result % 100,
            parameter_modes: determine_parameter_modes(Math.trunc(result / 100))
        }
    }

    function determine_parameter_modes(mask) {
        let direct_parameters = new Set()
        let relative_parameters = new Set()
        for (let parameter_index = 1;; ++parameter_index) {
            if (mask < 1) {
                break;
            } else if (mask % 10 === 1) {
                direct_parameters.add(parameter_index)
            } else if (mask % 10 === 2) {
                relative_parameters.add(parameter_index)
            } else if (mask % 10 !== 0) {
                throw RangeError('Corrupt mask value: ' + mask)
            }
            mask = Math.trunc(mask / 10)
        }
        return {
            direct_parameters: direct_parameters,
            relative_parameters: relative_parameters
        }
    }

    function add(parameter_modes) {
        binary_operation((lhs, rhs) => lhs + rhs, parameter_modes)
    }

    function multiply(parameter_modes) {
        binary_operation((lhs, rhs) => lhs * rhs, parameter_modes)
    }

    function binary_operation(raw_operation, parameter_modes) {
        let lhs = get(1, parameter_modes)
        let rhs = get(2, parameter_modes)
        let result = raw_operation(lhs, rhs)
        set(3, result, parameter_modes)
        index += 4
    }

    function read(parameter_modes) {
        let value = input()
        if (!Number.isInteger(value)) {
            throw Error('Input yielded non-integer valuen [' + value + ']')
        }
        set(1, value, parameter_modes)
        index += 2
    }

    function write(parameter_modes) {
        let value = get(1, parameter_modes)
        output(value)
        index += 2
    }

    function jump_if_true(parameter_modes) {
        let cond = get(1, parameter_modes)
        if (cond !== 0) {
            index = get(2, parameter_modes)
        } else {
            index += 3
        }
    }

    function jump_if_false(parameter_modes) {
        let cond = get(1, parameter_modes)
        if (cond === 0) {
            index = get(2, parameter_modes)
        } else {
            index += 3
        }
    }

    function less_than(parameter_modes) {
        let lhs = get(1, parameter_modes)
        let rhs = get(2, parameter_modes)
        result = (lhs < rhs)
        set(3, result ? 1 : 0, parameter_modes)
        index += 4
    }

    function equals(parameter_modes) {
        let lhs = get(1, parameter_modes)
        let rhs = get(2, parameter_modes)
        result = (lhs === rhs)
        set(3, result ? 1 : 0, parameter_modes)
        index += 4
    }

    function adjust_relative_base(parameter_modes) {
        let delta = get(1, parameter_modes)
        relative_base += delta
        index += 2
    }

    function get(offset, parameter_modes) {
        let result
        if (parameter_modes.direct_parameters.has(offset)) {
            result = data.get(index + offset)
            if (result === undefined) {
                throw Error('get: address out of bounds: ' + index + offset)
            }
        } else {
            let source_address = data.get(index + offset)
            if (parameter_modes.relative_parameters.has(offset)) {
                source_address += relative_base
            }
            if (source_address === undefined) {
                throw Error('get: address of source address out of bounds: ' + index + offset)
            }
            result = data.get(source_address)
            if (result === undefined) {
                return 0
            }
        }
        return result
    }

    function set(offset, value, parameter_modes) {
        let target_address = data.get(index + offset)
        if (parameter_modes.relative_parameters.has(offset)) {
            target_address += relative_base
        }
        data.set(target_address, value)
    }

    function build_data() {
        data.clear()
        for (let index = 0; index < raw_data.length; ++index) {
            data.set(index, raw_data[index])
        }
    }

    build_data()

    return {
        run: function () {
            while (true) {
                if (step()) {
                    break;
                }
            }
        },
        step: step,
        result: function(index) {
            return data.get(index)
        }
    }
}

exports.Intcode = Intcode

exports.Intcode_from_file = function(path, input, output) {
    let raw_data = fs.readFileSync(path, 'utf8')
        .split(',')
        .map(line => Number(line))
    return Intcode(raw_data, input, output)
}
