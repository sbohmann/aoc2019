import fs from 'fs'

function solve() {
    // let result = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']
    let result = fs.readFileSync('input.txt', 'utf8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
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

    let minimum = Number(match[1])
    let maximum = Number(match[2])
    let character = match[3]
    let password = match[4]

    if (maximum < minimum) {
        throw new Error('Corrupt input: [' + line + ']')
    }

    function count(text, character) {
        return Array.from(text)
            .reduce((count, candidate) =>
            (candidate === character)
                ? count + 1
                : count,
            0)
    }

    return {
        rule(text) {
            let numberOfOccurrences = count(text, character)
            return numberOfOccurrences >= minimum && numberOfOccurrences <= maximum
        },
        password
    }
}

solve()
