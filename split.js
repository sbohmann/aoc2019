
function printAsList(parts) {
    console.log('[' + parts.join(",") + ']')
}

printAsList("1;2;3;;;5;6;7;;;".split(";"))
printAsList("1;2;3;;;5;6;7;;;".split("|"))
