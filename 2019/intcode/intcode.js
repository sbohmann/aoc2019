let fs = require('fs')

function Intcode(raw_data, input, output) {
    let data = new Map()
    let index

    function step() {
        let opcode = read_opcode()
        switch (opcode.command) {
            case 1:
                add(opcode.direct_parameters)
                break
            case 2:
                multiply(opcode.direct_parameters)
                break
            case 3:
                read()
                break
            case 4:
                write(opcode.direct_parameters)
                break
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
            direct_parameters: determine_direct_parameters(Math.trunc(result / 100))
        }
    }

    function determine_direct_parameters(mask) {
        let result = new Set()
        for (let parameter_index = 1;; ++parameter_index) {
            if (mask < 1) {
                break;
            } else if (mask % 10 === 1) {
                result.add(parameter_index)
            } else if (mask % 10 !== 0) {
                throw RangeError('Corrupt mask value: ' + mask)
            }
            mask = Math.trunc(mask / 10)
        }
        return result
    }

    function add(direct_parameters) {
        binary_operation((lhs, rhs) => lhs + rhs, direct_parameters)
    }

    function multiply(direct_parameters) {
        binary_operation((lhs, rhs) => lhs * rhs, direct_parameters)
    }

    function binary_operation(raw_operation, direct_parameters) {
        let lhs = get(1, direct_parameters)
        let rhs = get(2, direct_parameters)
        let result = raw_operation(lhs, rhs)
        let target = data.get(index + 3)
        data.set(target, result)
        index += 4
    }

    function read() {
        let value = input()
        set(1, value)
        index += 2
    }

    function write(direct_parameters) {
        let value = get(1, direct_parameters)
        output(value)
        index += 2
    }

    function get(offset, direct_parameters) {
        if (direct_parameters.has(offset)) {
            return data.get(index + offset)
        } else {
            let source_address = data.get(index + offset)
            return data.get(source_address)
        }
    }

    function set(offset, value) {
        let target_address = data.get(index + offset)
        data.set(target_address, value)
    }

    function build_data() {
        data.clear()
        for (let index = 0; index < raw_data.length; ++index) {
            data.set(index, raw_data[index])
        }
        index = 0
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
