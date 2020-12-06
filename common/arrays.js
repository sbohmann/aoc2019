export default {
    equal(lhs, rhs) {
        const length = lhs.length
        if (rhs.length !== length) {
            return false
        }
        for (let index = 0; index < length; ++index) {
            if (lhs[index] !== rhs[index]) {
                return false
            }
        }
        return true
    }
}
