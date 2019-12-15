function Intcode(raw_data) {
    let data = new Map()
    let index

    function step() {
        let opcode = read_opcode()
        switch (opcode) {
            case 1:
                add()
                break
            case 2:
                multiply()
                break
            case 99:
                return true
            default:
                throw RangeError("Unknown opcode: " + opcode)
        }
    }

    function read_opcode() {
        let result = data.get(index)
        if (result === undefined) {
            throw RangeError("Index out of range: " + index)
        }
        ]
        return {
            command: result % 100,
            direct_parameters: determine_direct_parameters(result / 100)
        }
    }

    function determine_direct_parameters(mask) {
        let result = Set()
        for (let parameter_index = 1;; ++parameter_index) {
            if (mask < 1) {
                break;
            } else if (mask % 10 === 1) {
                result.add(parameter_index)
            } else {
                throw new RangeError('Corrupt mask value')
            }
            mask /= 10
        }
        return result
    }

    function add() {
        binary_operation((lhs, rhs) => lhs + rhs)
    }

    function multiply() {
        binary_operation((lhs, rhs) => lhs * rhs)
    }

    function binary_operation(raw_operation) {
        let lhs_source = data.get(index + 1)
        let rhs_source = data.get(index + 2)
        let result = raw_operation(data.get(lhs_source), data.get(rhs_source))
        let target = data.get(index + 3)
        data.set(target, result)
        index += 4
    }

    function read_data() {
        let raw_data = read_raw_data()
        build_data(raw_data)
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

exports.Intcode_from_file = function(path) {
    let raw_data = fs.readFileSync('input.txt', 'utf8')
        .split(',')
        .map(line => Number(line))
    return Intcode(raw_data)
}
