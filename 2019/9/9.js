const intcode = require('../intcode/intcode')

let input = [2]
intcode.Intcode_from_file(
    'input.txt',
    () => input.shift(),
    value => console.log(value))
    .run()
