import arrays from '../../common/arrays.js'
import {forEachGroup} from './1b.js'

function incrementIndicesTest() {
    const dataSize = 7
    let expectedValues = []
    for (let index1 = 0; index1 < dataSize; ++index1) {
        for (let index2 = index1 + 1; index2 < dataSize; ++index2) {
            for (let index3 = index2 + 1; index3 < dataSize; ++index3) {
                expectedValues.push([index1, index2, index3])
            }
        }
    }
    let data = Array(dataSize)
    for (let index = 0; index < dataSize; ++index) {
        data[index] = index
    }
    forEachGroup(3, data, group => {
        let expected = expectedValues.shift()
        if (!arrays.equal(group, expected)) {
            throw new Error('Assertion failed: ' + group + ' != ' + expected)
        }
    })
    if (expectedValues.length !== 0) {
        throw new Error('Expected values not exhausted')
    }
    console.log('incrementIndicesTest succeeded')
}

incrementIndicesTest()
