import {readLineGroups, readLines} from '../../common/io.js'

// let input = readLineGroups('test_input.txt')
let input = readLineGroups('input.txt')

function solveA() {
    let sum = input.reduce(
        (sum, group) => {
            let letters = new Set()
            group.forEach(line => {
                forEachLetter(line, letter => {
                    letters.add(letter)
                })
            })
            return sum + letters.size
        },
        0)

    console.log('a:', sum)
}

function solveB() {
    let sum = input.reduce(
        (sum, group) => {
            let commonLetters = group
                .map(line => {
                    let letters = new Set()
                    forEachLetter(line, letter => {
                        letters.add(letter)
                    })
                    return letters
                })
                .reduce(intersection)
            return sum + commonLetters.size
        },
        0)

    console.log('a:', sum)
}

function forEachLetter(text, consume) {
    for (let index = 0; index < text.length; ++index) {
        consume(text[index])
    }
}

function intersection(lhs, rhs) {
    return new Set(Array.from(lhs)
        .filter(element => rhs.has(element)))
}

solveA()
solveB()
