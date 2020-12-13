import fs from 'fs'

export function readLines(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
}

export function readRawLines(path) {
    return fs.readFileSync(path, 'utf8')
        .split('\n')
        .map(line => line.trim())
}
