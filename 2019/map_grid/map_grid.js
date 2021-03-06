exports.MapGrid = (default_value) => {
    let map = new Map()
    let bounds = {
        minx: 0,
        miny: 0,
        maxx: 0,
        maxy: 0
    }

    let painted = new Set()

    function extend_bounds(x, y) {
        if (x < bounds.minx) {
            bounds.minx = x
        }
        if (y < bounds.miny) {
            bounds.miny = y
        }
        if (x > bounds.maxx) {
            bounds.maxx = x
        }
        if (y > bounds.maxy) {
            bounds.maxy = y
        }
    }

    function create_key(position) {
        if (!Number.isInteger(position.x) || !Number.isInteger(position.y)) {
            throw Error('Illegal position [' + position.x + '/' + position.y + ']');
        }
        return position.x + ',' + position.y
    }

    function get(position) {
        let result = map.get(create_key(position))
        return result !== undefined ? result : default_value
    }

    function set(position, value) {
        let key = create_key(position)
        map.set(key, value)
        painted.add(key)
        extend_bounds(position.x, position.y)
    }

    function create_line(y, value_to_character) {
        let line = ''
        for (let x = bounds.minx; x <= bounds.maxx; ++x) {
            line += value_to_character(get({x: x, y: y}))
        }
        return line
    }

    function to_text(value_to_character) {
        if (value_to_character === undefined) {
            value_to_character = value => value
        }
        result = []
        for (let y = bounds.miny; y <= bounds.maxy; ++y) {
            let line = create_line(y, value_to_character)
            result.push(line)
        }
        return result
    }

    function write_to_console(value_to_character) {
        if (value_to_character === undefined) {
            value_to_character = value => value
        }
        for (let y = bounds.miny; y <= bounds.maxy; ++y) {
            let line = create_line(y, value_to_character)
            console.log(line)
        }
    }

    return {
        get: get,
        set: set,
        write_to_console: write_to_console,
        to_text: to_text,
        create_key: create_key,
        bounds: bounds,
        painted: painted
    }
}
