const containerPattern = () => /(\w+ \w+) bags contain (no other bags)?/
const containedPattern = () => /(\d+) (\w+ \w+) (bags?)/

export default function Container(line) {
    let containerColor
    let contained

    let knownContainedColors = new Set()

    function read() {
        let containerMatch = matchContainerPart()
        containerColor = containerMatch[1]

        let noOtherBags = containerMatch[2] != null
        if (noOtherBags) {
            contained = []
        } else {
            let containedListStart = containerMatch[0].length
            contained = readContainedBags(containedListStart)
        }
    }

    function matchContainerPart() {
        let result = line.match(containerPattern())
        if (result === null) {
            throw new Error('Illegal input line [' + line + ']')
        }
        return result
    }

    function readContainedBags(containedListStart) {
        let containedInput = extractContainedInput(containedListStart)
        return readContainedColors(containedInput)
    }

    function extractContainedInput(containedListStart) {
        if (line[line.length - 1] !== '.') {
            throw new Error('line does not end in dot [' + line + ']')
        }
        let containedListLength = line.length - containedListStart - 1
        return line.substr(containedListStart, containedListLength)
    }

    function readContainedColors(input) {
        return input
            .split(', ')
            .map(readContainedColor)
    }

    function readContainedColor(input) {
        let match = matchContainedPart(input)
        let number = Number(match[1])
        let color = distinctColor(match[2])
        checkContainedDeclension(number, match[3], input, match)
        return {
            number,
            color
        }
    }

    function matchContainedPart(input) {
        let result = input.match(containedPattern())
        if (result === null) {
            throw new Error('Illegal contained part [' + input + ']')
        }
        return result
    }

    function distinctColor(color) {
        if (knownContainedColors.has(color)) {
            throw new Error("Double occurrence of color [" + color + "] in input line [" + line + "]")
        }
        knownContainedColors.add(color)
        return color
    }

    function checkContainedDeclension(number, declension, input, match) {
        let numberIsOne = number === 1
        let declensionIsSingular = declension === 'bag'
        if (numberIsOne !== declensionIsSingular) {
            throw new Error('Illegal declension [' + declension + '] for number ' + number + ' in line [' + line + '], contained input [' + input + '], match [' + match + ']')
        }
    }

    read()

    return {
        color: containerColor,
        contained
    }
}
