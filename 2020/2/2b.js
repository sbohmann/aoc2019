import {readLines} from '../../common/io.js'

function solve() {
    // let result = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']
    let result = readLines('input.txt')
        .map(parse)
        .reduce(
            (count, line) =>
                line.rule(line.password)
                    ? count + 1
                    : count,
            0)
    console.log(result)
}

function parse(line) {
    let match = line.match(/(\d+)-(\d+) ([a-z]): ([a-z]+)/)

    let firstIndex = Number(match[1])
    let secondIndex = Number(match[2])
    let character = match[3]
    let password = match[4]

    function count(text, character) {
        return Number(text[firstIndex - 1] === character) +
            Number(text[secondIndex - 1] === character)
    }

    return {
        rule(text) {
            return count(text, character) === 1
        },
        password
    }
}

solve()
