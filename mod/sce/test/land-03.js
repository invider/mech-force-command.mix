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

let targetMech
function genSquads(world, opt) {
    const mech = world.spawn( dna.bot.Mech, {
        team: 1,
        x: 2,
        y: 4,
    })
    mech.attach( dna.pod.markPath )

    mech.attach( dna.pod.pathFinder )
    mech.attach( dna.behavior.PathWalker )
    targetMech = mech

    const tx = 10
    const ty = 6
    world.set(tx, ty, 'o')
    world.setf(tx, ty, '#402020')
    mech.pathFinder.findPath(tx, ty)
}

function next() {
    if (targetMech && targetMech.x === 10 && targetMech.y === 6) {
        targetMech = null
        trap('nextTest')
    }
}

function setup() {
    lab.mode.titleBar.title = name
    job.mission.define('next', next)
}
