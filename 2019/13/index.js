let game = require('./game')
let input = []
let auto = false
let ball_position
let ball_velocity
let paddle_x
let rounds = 0
let max_y = 0
let initialized = false

function for_delta(action) {
    // let steps = Math.trunc((Math.abs(paddle_position - ball_position) + 2) / 3)
    let steps = 1
    for (let index = 0; index < steps; ++index) {
        action()
    }
}

function move(delta) {
    input.push(delta)
    paddle_x += delta
    console.log('move ' + delta)
}

function is_ball(value) {
    return value === 4
}

function is_paddle(value) {
    return value === 3
}

function handle_output(x, y, value) {
    if (!initialized) {
        if (y > max_y) {
            max_y = y
        } else if (y < max_y) {
            rounds = 0
            initialized = true
        }
    }
    if (is_ball(value)) {
        if (ball_position !== undefined) {
            ball_velocity = x - ball_position.x
        }
        ball_position = {x:x, y:y}
    }
    // if (game.grid.get())
    if (is_paddle(value) && paddle_x === undefined) {
        paddle_x = x
    }
    if (auto && ball_position !== undefined && ball_velocity !== undefined && (is_paddle(value) || is_ball(value))) {
        if (paddle_x > ball_position.x) {
            if (ball_velocity < 0) {
                for_delta(() => move(-1))
            } else {
                move(-1)
            }
        } else if (paddle_x < ball_position.x) {
            if (ball_velocity > 0) {
                for_delta(() => move(1))
            } else {
                move(1)
            }
        } else if (paddle_x === ball_position.x) {
            // if (ball_velocity < 0) {
            //     move(-1)
            // } else if (ball_velocity > 0) {
            //     move(1)
            // }
        }
    }
    if ((is_paddle(value) || is_ball(value)) && rounds === 1) {
        rounds = 0
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
                rounds = 0
                break
            case ' ':
                rounds = 1
                break
            case 'a':
            case 'A':
                auto = !auto
                break
        }
    }
}
