import fs from 'fs'

export function readLines(path) {
    return readUnfilteredLines(path)
        .filter(line => line.length > 0)
}

export function readUnfilteredLines(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\n')
        .map(line => line.trim())
}

export function readRawLines(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\n')
        .map(line => line.trim())
}

export function readLineGroups(path) {
    let lines = readUnfilteredLines(path)
    let groups = Groups()
    lines.forEach(groups.processLine)
    return groups.result()
}

function Groups() {
    let currentGroup = []
    let result = []

    function addNonEmptyCurrentGroup() {
        if (currentGroup.length > 0) {
            addCurrentGroup()
        }
    }

    function addCurrentGroup() {
        result.push(currentGroup)
        currentGroup = []
    }

    return {
        processLine(line) {
            if (line.length === 0) {
                addNonEmptyCurrentGroup()
            } else {
                currentGroup.push(line)
            }
        },
        result() {
            addNonEmptyCurrentGroup()
            return result
        }
    }
}
