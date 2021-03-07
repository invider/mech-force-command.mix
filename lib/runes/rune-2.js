module.exports = function(world, x, y) {
    const cl = lib.runes.util.clear
    const wall = lib.runes.util.wall

    wall(world, x + 1, y + 1, 0, 1)
    cl(world, x,      y + 1)
    cl(world, x + 2,  y + 1)
}
