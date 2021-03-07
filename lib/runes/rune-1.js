module.exports = function(world, x, y) {
    const cl = lib.runes.util.clear
    const wall = lib.runes.util.wall

    wall(world, x + 1, y + 1, -1, 0)
    cl(world, x + 1,  y)
    cl(world, x + 1,  y + 2)
}
