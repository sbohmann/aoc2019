let a = 13
let b = 17
let base_ratio = a / b
console.log(base_ratio)

for (let index = 0; index < 100; ++index) {
    a *= 3
    b *= 3
    let ratio = a / b
    if (ratio !== base_ratio) {
        console.log(a / b + ' (' + a + ' / ' + b + ')')
    }
}
