const name = 'Waypoints'

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
        x: 2,
        y: 2,
    })

    const d2 = world.spawn(dna.bot.Mech, {
        team: 0,
        symbol: 'B',
        x: 6,
        y: 5,
    })
    d2.attach( dna.behavior.EmptyBrain )

    const m1 = world.spawn( dna.prop.Marker, {
        team: 1,
        id: 1,
        x: 6,
        y: 7,
    })
    const m2 = world.spawn( dna.prop.Marker, {
        team: 1,
        id: 2,
        x: 3,
        y: 3,
    })
    const m3 = world.spawn( dna.prop.Marker, {
        team: 1,
        id: 3,
        x: 1,
        y: 6,
    })

    lab.mode.port1.target.team = 1
    lab.mode.port2.target.team = 1
    lab.mode.port3.target.team = 1
    lab.mode.port4.target.team = -1

    lab.mode.port1.focusOn(d1)
    lab.mode.port2.focusOn(d1)

    env.team[0].active = false
    env.team[2].active = false
    env.team[3].active = false
    env.team[4].active = false

    // ===============================
    // orders!
    //d1.brain.order('follow path', m1, m3, m1, m2)
}

function setup() {
    lab.mode.titleBar.title = name
    lab.mode.port1.lookAt(0, 0)
    lab.mode.port2.lookAt(8, 0)
    lab.mode.port3.lookAt(0, 8)
    lab.mode.port4.lookAt(8, 8)
}
