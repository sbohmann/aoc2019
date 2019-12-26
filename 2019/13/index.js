let game = require('./game')
let input = []
let auto = false
let ball_position
let ball_velocity
let paddle_position

function for_delta(action) {
    let steps = Math.trunc((Math.abs(paddle_position - ball_position) + 2) / 3)
    for (let index = 0; index < steps; ++index) {
        action()
    }
}

function move(delta) {
    input.push(delta)
    paddle_position += delta
}

function handle_output(x, y, value) {
    if (value === 4) {
        if (ball_position !== undefined) {
            ball_velocity = x - ball_position
        }
        ball_position = x
    }
    if (value === 3 && paddle_position === undefined) {
        paddle_position = x
    }
    if (auto && ball_position !== undefined && ball_velocity !== undefined && (value === 3 || value === 4)) {
        if (paddle_position > ball_position + 1) {
            if (ball_velocity < 0) {
                for_delta(() => move(-1))
            } else {
                move(-1)
            }
        } else if (paddle_position < ball_position - 1) {
            if (ball_velocity > 0) {
                for_delta(() => move(1))
            } else {
                move(1)
            }
        } else if (paddle_position === ball_position) {
            if (ball_velocity < 0) {
                move(-1)
            } else if (ball_velocity > 0) {
                move(1)
            }
        }
    }
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
                move(-1)
                break
            case 'ArrowRight':
                move(1)
                break
            case 'ArrowUp':
                rounds = 100
                break
            case 'ArrowDown':
                rounds = 1
                break
            case 'a':
            case 'A':
                auto = !auto
                break
        }
    }
}
