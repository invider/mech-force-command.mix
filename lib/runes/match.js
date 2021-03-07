function matchRune(world, pat, px, py, fn) {
    for (let y = 0; y < pat.length; y++) {
        for (let x = 0; x < pat[y].length; x++) {
            const t = pat[y][x]

            const prop = world.getProp(px + x, py + y)
            if (t === '.' && (prop && prop.symbol === 'o')) return false
            if (t === 'o' && (!prop || prop.symbol !== 'o')) return false
        }
    }

    log('matched at ' + px + ':' + py)
    fn(world, px, py)
    return true
}

function matchPattern(world, pat, x, y, fn) {
    const scanH = pat.length
    const scanW = pat[0].length
    const scanHH = 2 * scanH - 2
    const scanWW = 2 * scanW - 2

    let sx = x - scanW + 1
    let sy = y - scanH + 1

    for (let j = 0; j < scanHH; j++) {
        for (let i = 0; i < scanWW; i++) {
            if (matchRune(world, pat, sx + i, sy + j, fn)) {
                return true
            }
        }
    }
    return false
}

function match(world, x, y) {
    for (let i = 0; i < lib.runes.pat.length; i++) {
        const pat = lib.runes.pat[i]
        const fn = lib.runes.rune[i]
        if (matchPattern(world, pat, x, y, fn)) break;
    }
}

function logPattern(pat) {
    let out = ''

    pat.forEach(l => {
        out += l.join('') + '\n'
    })
    log.raw(out)
    return out
}

function logTerrain(world, x, y) {
    let out = ''
    for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
            const prop = world.getProp(x + dx, y + dy)
            if (prop && prop.symbol === 'o') out += 'o'
            else out += '.'
        }
        out += '\n'
    }
    log.raw(out)
    return out
}
