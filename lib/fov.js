function fov(observer, test) {

    const r = observer.r
    const sx = -observer.x + r
    const sy = -observer.y + r

    const map = []
    const f = {
        w: 2*r + 1,
        h: 2*r + 1,
        x: r,
        y: r,
        map: map,
        test: function (x, y) {
            const lx = x + sx
            const ly = y + sy
            if (lx < 0 || lx >= this.w
                || ly < 0 || ly >= this.h) return false
            const i = ly * this.w + lx
            return map[i]
        }
    }

    for (let y = 0; y < f.h; y++) {
        for (let x = 0; x < f.w; x++) {
            const gx = x + sx
            const gy = y + sy
            //const transparent = test(gx, gy)
            let visible
            const lx = x - r
            const ly = y - r
            //if (dist(0, 0, lx, ly) < r) visible = true
            if (lx*lx + ly*ly < r*r) visible = true
            f.map[y*f.w + x] = visible
        }
    }
    //map[r*f.w + r] = true
    //map[r*f.w + r+1] = true
    //map[r*f.w + r-1] = true

    return f
}
