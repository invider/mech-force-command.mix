const name = 'Ram to capture!'

const opt = {
    w: 8,
    h: 8,
    base: '.',
}

function genTerrain(world, opt) {
    lib.ken.generateSquare(world, opt)
}

function genSquads(world, opt) {
    const d1 = world.spawn(dna.bot.Droid, {
        team: 1,
        symbol: 'A',
        x: 2,
        y: 2,
    })

    const d2 = world.spawn(dna.bot.Droid, {
        team: 0,
        symbol: 'B',
        x: 7,
        y: 2,
    })

    const d3 = world.spawn(dna.bot.Droid, {
        team: 0,
        symbol: 'C',
        x: 1,
        y: 6,
    })

    const d4 = world.spawn(dna.bot.Droid, {
        team: 0,
        symbol: 'D',
        x: 6,
        y: 6,
    })

    lab.mode.port1.focusOn(d1)
    lab.mode.port2.target.team = -1
    lab.mode.port3.target.team = 1
    lab.mode.port4.target.team = 0

    env.team[0].active = false
    env.team[2].active = false
    env.team[3].active = false
    env.team[4].active = false
}

function setup() {
    lab.mode.titleBar.title = name
    lab.mode.port1.lookAt(0, 0)
    lab.mode.port2.lookAt(8, 0)
    lab.mode.port3.lookAt(0, 8)
    lab.mode.port4.lookAt(8, 8)
}
