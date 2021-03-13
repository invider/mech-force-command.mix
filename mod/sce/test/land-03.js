const name = 'The Path'

const opt = {
    w: 12,
    h: 10,
    base: '.',
}

function genTerrain(world, opt) {
    lib.ken.generateSquare(world, opt)

    lib.geo.vline(world, 8, 3, 4, '^')
    lib.geo.hline(world, 4, 2, 4, '^')
    lib.geo.hline(world, 4, 7, 4, '^')
    lib.geo.hline(world, 2, 6, 3, '^')
}

let targetDroid
function genSquads(world, opt) {
    const droid = world.spawn( dna.bot.Droid, {
        team: 1,
        x: 2,
        y: 4,
    })
    droid.attach( dna.pod.markPath )

    droid.attach( dna.pod.pathFinder )
    droid.attach( dna.behavior.PathWalker )
    targetDroid = droid

    const tx = 10
    const ty = 6
    world.set(tx, ty, 'o')
    world.setf(tx, ty, '#402020')
    droid.pathFinder.findPath(tx, ty)
}

function next() {
    if (targetDroid && targetDroid.x === 10 && targetDroid.y === 6) {
        targetDroid = null
        trap('nextTest')
    }
}

function setup() {
    lab.mode.titleBar.title = name
    lab.control.mission.define('next', next)
}
