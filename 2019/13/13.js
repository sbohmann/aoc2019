let game = require('./game')

game.run()

let blocks = 0
game.grid.write_to_console(value => {
    if (value === 2) {
        ++blocks
    }
    return game.value_to_character(value)
})
console.log()
console.log(blocks)
