export function GroupIterator(data, groupSize) {
    if (groupSize > data.length) {
        throw new RangeError('groupSize > data.length')
    }

    let indices = initialIndices(groupSize)

    function incrementIndicesOrReturnFalse() {
        for (let groupIndex = groupSize - 1; groupIndex >= 0; --groupIndex) {
            if (canIncrement(groupIndex)) {
                increment(groupIndex)
                return true
            }
        }
        return false
    }

    function canIncrement(groupIndex) {
        let numberOfSubGroupIndices = groupSize - groupIndex
        return indices[groupIndex] < data.length - numberOfSubGroupIndices
    }

    function increment(groupIndex) {
        let newValueForGroupIndex = ++indices[groupIndex]
        resetSubGroupIndices(groupIndex, newValueForGroupIndex)
    }

    function resetSubGroupIndices(groupIndex, newValueForGroupIndex) {
        for (let subGroupIndex = groupIndex + 1; subGroupIndex < groupSize; ++subGroupIndex) {
            indices[subGroupIndex] = ++newValueForGroupIndex
        }
    }

    return {
        next() {
            return incrementIndicesOrReturnFalse()
        },
        get() {
            return indices.map(index => data[index])
        }
    }
}

function initialIndices(groupSize) {
    let result = Array(groupSize)
    for (let index = 0; index < groupSize; ++index) {
        result[index] = index
    }
    return result
}
