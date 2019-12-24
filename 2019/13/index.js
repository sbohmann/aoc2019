let game = require('./game')

game.coin()
game.run()

window.onload = () => {
    let pre = document.querySelector('pre')
    pre.style.fontSize = '24px'
    game.grid.to_text(game.value_to_character)
        .forEach(line => {
            pre.appendChild(document.createTextNode(line + '\n'))
        })
}
