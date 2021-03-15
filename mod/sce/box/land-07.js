const name = 'Factories'

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
    lib.geo.vline(world, 3, 6, 2, '^')

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

    world.spawn( dna.prop.Factory, { x: 5, y: 6 })

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
}

function setup() {
    lab.mode.titleBar.title = name
}
