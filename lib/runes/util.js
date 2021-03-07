function clear(world, x, y) {
    const prop = world.getProp(x, y)
    if (prop) prop.dead = true
}

function wall(world, x, y, dx, dy) {
    const prop = world.getProp(x, y)
    if (prop && prop.symbol === 'o') {
        prop.dead = true
        world.set(x, y, '#')
        wall(world, x + dx, y + dy, dx, dy)
    }
}
