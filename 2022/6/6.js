const fs = require('fs')

let input = fs.readFileSync('input.txt', 'utf-8')

function search(length) {
    let position = 0

    function calculateResult() {
        while (position <= input.length - length) {
            if (matching()) {
                return position + length
            }
            ++position
        }
        throw new RangeError("No result found")
    }

    function matching() {
        for (let offset = length - 1; offset > 0; --offset) {
            let pivotIndex = position + offset
            let pivot = input[pivotIndex]
            for (let index = position; index < pivotIndex; ++index) {
                if (input[index] === pivot) {
                    return false
                }
            }
        }
        return true
    }

    return calculateResult()
}

console.log('6a:', search(4))
console.log('6b:', search(14))
