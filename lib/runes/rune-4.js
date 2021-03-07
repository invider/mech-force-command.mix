module.exports = function(world, x, y) {
    const cl = lib.runes.util.clear
    const wall = lib.runes.util.wall

    cl(world, x + 1,  y)
    cl(world, x,      y + 1)
    cl(world, x + 2,  y + 1)
    cl(world, x + 1,  y + 2)

    //world.set(x+1, y+1, 'X')
    world.spawn({
        symbol: 'X',
        x: x + 1,
        y: y + 1,
    })
    world.intent.recalc(1)
}
