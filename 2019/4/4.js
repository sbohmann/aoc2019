const minimum = 245182
const maximum = 790572

let result = 0

for (let n = minimum; n <= maximum; ++n) {
    let s = String(n)
    let last_digit_value
    let monotonous = true
    let group_length = 0
    let pair = false
    for (let digit of s) {
        let digit_value = Number(digit)
        if (digit_value < last_digit_value)
        {
            monotonous = false
            break
        } else if (digit_value === last_digit_value) {
            ++group_length
        } else {
            if (group_length === 2) {
                pair = true
            }
            group_length = 1
        }
        last_digit_value = digit_value
    }
    if (group_length === 2) {
        pair = true
    }
    if (monotonous && pair) {
        ++result
    }
}

console.log(result)
