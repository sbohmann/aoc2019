let game = require('./game')
let input = []

function handle_output(x, y, value) {
    console.log(x, y, value)
}

function provide_input() {
    if (input.length > 0) {
        return input.shift()
    } else {
        return 0
    }
}

game.coin()
game.set_output_handler(handle_output)
game.set_input_provider(provide_input)

window.onload = () => {
    let pre = document.querySelector('pre')
    pre.style.fontSize = '24px'
    let text = document.createTextNode('')
    pre.appendChild(text)
    let score = document.querySelector('#score')
    let score_text = document.createTextNode('')
    score.appendChild(score_text)
    let rounds = 0
    setInterval(() => {
        for (let index = 0; index < rounds; ++index) {
            game.step()
        }
        text.nodeValue = game.grid.to_text(game.value_to_character)
            .reduce((previous, current) => previous + '\n' + current)
        score_text.nodeValue = game.score().toString()
    }, 0)
    setInterval(() => text.nodeValue = game.grid.to_text(game.value_to_character)
        .reduce((previous, current) => previous + '\n' + current), 1000)
    let key_thing = document.createElement('h1')
    let key_thing_text = document.createTextNode('')
    key_thing.appendChild(key_thing_text)
    key_thing_text.nodeValue = 'Bla'
    document.body.appendChild(key_thing)
    window.onkeydown = (event) => {
        key_thing_text.nodeValue = event.key
        switch (event.key) {
            case 'ArrowLeft':
                input.push(-1)
                break
            case 'ArrowRight':
                input.push(1)
                break
            case 'ArrowUp':
                rounds = 100
                break
            case 'ArrowDown':
                rounds = 5
                break
        }
    }
}
