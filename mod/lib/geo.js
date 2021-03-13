function vline(world, x, y, h, land) {
    for (let i = 0; i < h; i++) {
        world.set(x, y + i, land)
    }
}

function hline(world, x, y, w, land) {
    for (let i = 0; i < w; i++) {
        world.set(x + i, y, land)
    }
}

