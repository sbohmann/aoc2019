function hand(name, ordinal) {
    return Object.freeze({
        name,
        ordinal
    })
}

const Hand = Object.freeze({
    rock: hand('rock', 0),
    paper: hand('paper', 1),
    scissors: hand('scissors', 2),
    compare(a, b) {
        // trust me 🤣
        return (((3 + a.ordinal - b.ordinal) % 3 + 1) % 3 - 1)
    },
    stronger(hand) {
        return handForOrdinal((hand.ordinal + 1) % 3)
    },
    weaker(hand) {
        return handForOrdinal((3 + hand.ordinal - 1) % 3)
    }
})

function handForOrdinal(ordinal) {
    switch (ordinal) {
        case 0:
            return Hand.rock
        case 1:
            return Hand.paper
        case 2:
            return Hand.scissors
        default:
            throw new RangeError()
    }
}

function parseHand(descriptor) {
    switch (descriptor) {
        case 'A':
        case 'X':
            return Hand.rock
        case 'B':
        case 'Y':
            return Hand.paper
        case 'C':
        case 'Z':
            return Hand.scissors
        default:
            throw new RangeError('Unrecognized hand descriptor: ' + descriptor)
    }
}

function goal(name, getOpponentHand) {
    return Object.freeze({
        name,
        getOpponentHand
    })
}

const Goal = Object.freeze({
    lose: goal('rock', Hand.weaker),
    draw: goal('paper', hand => hand),
    win: goal('scissors', Hand.stronger)
})

function parseGoal(descriptor) {
    switch (descriptor) {
        case 'X':
            return Goal.lose
        case 'Y':
            return Goal.draw
        case 'Z':
            return Goal.win
        default:
            throw new RangeError('Unrecognized goal descriptor: ' + descriptor)
    }
}

Object.assign(exports, {
    Hand,
    parseHand,
    parseGoal
})
