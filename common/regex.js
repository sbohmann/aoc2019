function matchOrFail(text, regex) {
    let result = text.match(regex)
    if (!result) {
        let shortenedText =
            text.length > 100
                ? text.substring(0, 97) + '...'
                : text
        throw new RangeError(`Failed to match text [${shortenedText}] with regex [${regex}]`)
    }
    return result
}

exports.matchOrFail = matchOrFail
