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

function goal(name, getAchievingHand) {
    return Object.freeze({
        name,
        getAchievingHand
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

function resultPoints(playerHand, opponentHand) {
    let difference = Hand.compare(playerHand, opponentHand)
    switch (difference) {
        case -1:
            return 0
        case 0:
            return 3
        case 1:
            return 6
        default:
            throw new RangeError("Failed to interpret comparison result " + difference)
    }
}

function handPoints(playerHand) {
    switch (playerHand) {
        case Hand.rock:
            return 1
        case Hand.paper:
            return 2
        case Hand.scissors:
            return 3
        default:
            throw new RangeError("Unknown hand: " + hand.name)
    }
}

function evaluateRound(playerHand, opponentHand) {
    return resultPoints(playerHand, opponentHand) + handPoints(playerHand)
}

Object.assign(exports, {
    parseHand,
    parseGoal,
    evaluateRound
})
