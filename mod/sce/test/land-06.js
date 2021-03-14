const name = 'Combat Action on Patrol'

const opt = {
    w: 8,
    h: 8,
    base: '.',
}

function genTerrain(world, opt) {
    lib.ken.generateSquare(world, opt)
}

function genSquads(world, opt) {
    lib.geo.vline(world, 3, 5, 3, '^')

    const d1 = world.spawn(dna.bot.Mech, {
        team: 1,
        symbol: 'A',
        x: 5,
        y: 2,
    })
    const m1 = world.spawn( dna.prop.Marker, {
        team: 1,
        id: 1,
        x: 1,
        y: 2,
    })
    const m2 = world.spawn( dna.prop.Marker, {
        team: 1,
        id: 2,
        x: 6,
        y: 2,
    })

    const d2 = world.spawn(dna.bot.Mech, {
        team: 2,
        symbol: 'B',
        x: 5,
        y: 6,
    })

    const m21 = world.spawn( dna.prop.Marker, {
        team: 2,
        id: 1,
        x: 1,
        y: 6,
    })
    const m22 = world.spawn( dna.prop.Marker, {
        team: 2,
        id: 2,
        x: 6,
        y: 6,
    })

    lab.mode.port1.target.team = 1
    lab.mode.port2.target.team = 2
    lab.mode.port3.target.team = 1
    lab.mode.port4.target.team = 2

    lab.mode.port1.focusOn(d1)
    lab.mode.port2.focusOn(d2)

    /*
    env.team[0].active = false
    env.team[2].active = false
    env.team[3].active = false
    env.team[4].active = false
    */

    // ===============================
    // orders!
    d1.brain.order('patrol path', m1,  m2)
    d2.brain.order('patrol path', m21, m22)
}

function setup() {
    _.sce.test.util.setTitle(name)

    job.mission.define('kill', (source, context) => {
        defer(() => {
            trap('nextTest')
        }, 2)
    })
}
