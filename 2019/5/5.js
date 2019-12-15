let intcode = require('../intcode/intcode')

let machine = intcode.Intcode([1, 5, 6, 0, 99, 10, 20])
machine.run()
console.log(machine.result(0))
