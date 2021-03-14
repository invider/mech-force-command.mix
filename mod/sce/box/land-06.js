const name = 'Drops'

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
        team: 1,
        symbol: 'B',
        x: 6,
        y: 5,
    })
    d2.attach( dna.behavior.EmptyBrain )

    world.spawn(dna.prop.Drop, { team: 2, x: 4, y: 2 })
    world.spawn(dna.prop.Drop, { team: 2, x: 6, y: 2 })
    world.spawn(dna.prop.Drop, { team: 2, x: 7, y: 2 })
    world.spawn(dna.prop.Drop, { team: 2, x: 2, y: 3 })
    world.spawn(dna.prop.Drop, { team: 2, x: 5, y: 4 })
    world.spawn(dna.prop.Drop, { team: 2, x: 7, y: 4 })

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

    lab.mode.port1.lookAt(0, 0)
    lab.mode.port2.lookAt(8, 0)
    lab.mode.port3.lookAt(0, 8)
    lab.mode.port4.lookAt(8, 8)

    lab.mode.port1.target.team = 1
    lab.mode.port2.target.team = 1
    lab.mode.port3.target.team = 1
    lab.mode.port4.target.team = -1

    lab.mode.port1.focusOn(d1)

    for (let i = 0; i <= 4; i++) {
        env.team[i].active = false
        env.team[i].jump   = false
    }

    // ===============================
    // orders!
    //d1.brain.order('follow path', m1, m3, m1, m2)
}

function setup() {
    lab.mode.titleBar.title = name
}
