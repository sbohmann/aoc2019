module.exports = (array) => {
    let working_copy = Array.from(array)
    let result = []
    while (working_copy.length > 0) {
        let chosen_index = Math.trunc(Math.random() * working_copy.length)
        if (chosen_index > 0) {
            let chosen_value = working_copy[chosen_index]
            result.push(chosen_value)
            working_copy[chosen_index] = working_copy[0]
            working_copy.shift()
        } else {
            result.push(working_copy.shift())
        }
    }
    return result
}
