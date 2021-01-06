export function year(min, max) {
    function valid(value) {
        return value.match(/\d{4}/) &&
            valueInRange(value)
    }

    function valueInRange(value) {
        let number = Number(value)
        return number && numberInRange(number)
    }

    function numberInRange(number) {
        return number >= min && number <= max
    }

    return valid
}

export function height(value) {
    function valid() {
        let match = value.match(/(-?\d+(?:\.\d+)?)(cm|in)/)
        return match && inRange(Number(match[1]), match[2])
    }

    function inRange(number, unit) {
        switch (unit) {
            case 'cm':
                return inCmRange(number)
            case 'in':
                return inInchRange(number)
            default:
                throw RangeError('Illegal height unit: ' + unit)
        }
    }

    function inCmRange(number) {
        return number >= 150 && number <= 193
    }

    function inInchRange(number) {
        return number >= 59 && number <= 76
    }

    return valid()
}

export function hairColor(value) {
    return value.match(/#[0-9a-f]{6}/) != null
}

const eyeColors = new Set([
    'amb',
    'blu',
    'brn',
    'gry',
    'grn',
    'hzl',
    'oth'
])

export function eyeColor(value) {
    return eyeColors.has(value)
}

export function passportId(value) {
    let match = value.match(/(0*)([1-9][0-9]*)/)
    return match && match[0].length === 9
}
