const df = {
    splitBorder: 4,
    doors: 6,
    minSize: 6,
    maxSize: 20,
}

function vdraw(geo, x, y1, y2, land) {
    for (let y = y1; y < y2; y++) {
        geo.seg.lset(x, y, land)
    }
}

function hdraw(geo, y, x1, x2, land) {
    for (let x = x1; x < x2; x++) {
        geo.seg.lset(x, y, land)
    }
}

function split(geo, x, y, w, h) {
    const horizontal = RND(1)
    const size = RND(geo.minSize, geo.maxSize)

    const doors = 1 + RND(geo.doors)

    if (horizontal) {
        if (h < size) return
        const sy = y + geo.splitBorder + RND(h - 2*geo.splitBorder - 1)
        hdraw(geo, sy, x, x + w, '#')
        for (let d = 0; d < doors; d++) {
            const nx = x + RND(w - 1)
            hdraw(geo, sy, nx, nx + 1, geo.seg.def)
        }
        split(geo, x, y, w, sy-y)
        split(geo, x, y+sy, w, h-(sy-y))

    } else {
        if (w < size) return
        const sx = x + geo.splitBorder + RND(w - 2*geo.splitBorder - 1)
        vdraw(geo, sx, y, y + h, '#')

        for (let d = 0; d < doors; d++) {
            const nx = x + RND(w - 1)
            hdraw(geo, sx, nx, nx + 1, geo.seg.def)
        }

        split(geo, x, y, sx-x, h)
        split(geo, x+sx, y, w-(sx-x), h)
    }
}

function binaryRooms(segment, st) {
    const geo = augment({}, df)
    augment(geo, st)
    geo.seg = segment

    split(geo, 0, 0, geo.seg.w, geo.seg.h)
}
