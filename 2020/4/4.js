import {readRawLines} from '../../common/io.js'
import {eyeColor, hairColor, height, passportId, year} from './validation.js'

// let lines = [
//     'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
//     'byr:1937 iyr:2017 cid:147 hgt:183cm',
//     '',
//     'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
//     'hcl:#cfa07d byr:1929',
//     '',
//     'hcl:#ae17e1 iyr:2013',
//     'eyr:2024',
//     'ecl:brn pid:760753108 byr:1931',
//     'hgt:179cm',
//     '',
//     'hcl:#cfa07d eyr:2025 pid:166559648',
//     'iyr:2011 ecl:brn hgt:59in'
// ]

let lines = readRawLines('input.txt')

function collectGroups() {
    let result = []
    let currentGroup = new Map()

    function processLines() {
        lines.forEach(line => {
            if (line === '') {
                pushCurrentGroup()
            } else {
                let search = /(\w{3}):(\S*)/g
                let match
                while (match = search.exec(line)) {
                    currentGroup.set(match[1], match[2])
                }
            }
        })
        pushCurrentGroup()
    }

    function pushCurrentGroup() {
        if (currentGroup.size > 0) {
            result.push(currentGroup)
            currentGroup = new Map()
        }
    }

    processLines()
    return result
}

let groups = collectGroups()

let checkedEntries = new Map([
    ['byr', year(1920, 2002)],
    ['iyr', year(2010, 2020)],
    ['eyr', year(2020, 2030)],
    ['hgt', height],
    ['hcl', hairColor],
    ['ecl', eyeColor],
    ['pid', passportId]
])

let requiredKeys = Array.from(checkedEntries.keys())

function allRequiredKeysPresent(group) {
    return !requiredKeys.find(key => !group.has(key))
}

function allValuesAreValid(group) {
    for (let [key, value] of group) {
        let check = checkedEntries.get(key)
        if (check && !check(value)) {
            return false
        }
    }
    return true
}

console.log('a:',
    groups
        .filter(allRequiredKeysPresent)
        .length)

console.log('b:',
    groups
        .filter(allValuesAreValid)
        .filter(allRequiredKeysPresent)
        .length)
