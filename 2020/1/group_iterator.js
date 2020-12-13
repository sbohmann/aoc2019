export function GroupIterator(data, groupSize) {
    if (groupSize > data.length) {
        throw new RangeError('groupSize > data.length')
    }

    let state = initialState(groupSize)

    function incrementIndicesOrFalse() {
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
        return state[groupIndex] < data.length - numberOfSubGroupIndices
    }

    function increment(groupIndex) {
        let newValueForGroupIndex = ++state[groupIndex]
        resetSubGroupIndices(groupIndex, newValueForGroupIndex)
    }

    function resetSubGroupIndices(groupIndex, newValueForGroupIndex) {
        for (let subGroupIndex = groupIndex + 1; subGroupIndex < groupSize; ++subGroupIndex) {
            state[subGroupIndex] = ++newValueForGroupIndex
        }
    }

    return {
        next() {
            return incrementIndicesOrFalse()
        },
        get() {
            return state.map(index => data[index])
        }
    }
}

function initialState(length) {
    let result = Array(length)
    for (let index = 0; index < length; ++index) {
        result[index] = index
    }
    return result
}
