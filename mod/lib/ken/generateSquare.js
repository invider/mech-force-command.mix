function generateSquare(world, cfg) {
    const w = cfg.w || 64
    const h = cfg.h || 64
    world.width = w
    world.height = h

    const land = cfg.land || '.'
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            world.set(x, y, land)
        }
    }
}
