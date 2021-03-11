const name = 'The Path'

const opt = {
    w: 12,
    h: 10,
    base: '.',
}

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

function genTerrain(world, opt) {
    lib.ken.generateSquare(world, opt)

    vline(world, 8, 3, 4, '^')
    hline(world, 4, 2, 4, '^')
    hline(world, 4, 7, 4, '^')
}

function genSquads(world, opt) {
    const droid = world.spawn( dna.bot.Droid, {
        team: 1,
        x: 2,
        y: 4,
    })
    droid.attach( dna.pod.markPath )

    droid.attach( dna.pod.pathFinder )
    droid.attach( dna.behavior.PathWalker )

    const tx = 10
    const ty = 6
    world.set(tx, ty, 'o')
    droid.pathFinder.findPath(tx, ty)
}
