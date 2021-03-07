module.exports = function(world, x, y) {
    const cl = lib.runes.util.clear
    const wall = lib.runes.util.wall

    cl(world, x,      y)
    cl(world, x + 1,  y)
    cl(world, x + 2,  y)
    cl(world, x,      y + 1)
    cl(world, x + 2,  y + 1)
    cl(world, x,      y + 2)
    cl(world, x + 1,  y + 2)
    cl(world, x + 2,  y + 2)

    world.infected.guard(x + 1, y + 1)
}
