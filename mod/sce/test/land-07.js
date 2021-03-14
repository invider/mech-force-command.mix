const name = 'Capture orders'

const opt = {
    w: 8,
    h: 8,
    base: '.',
}

function genTerrain(world, opt) {
    lib.ken.generateSquare(world, opt)
}

function genSquads(world, opt) {
    const d1 = world.spawn(dna.bot.Mech, {
        team: 1,
        symbol: 'A',
        x: 2,
        y: 2,
    })

    const d2 = world.spawn(dna.bot.Mech, {
        team: 0,
        symbol: 'B',
        x: 7,
        y: 2,
    })

    const d3 = world.spawn(dna.bot.Mech, {
        team: 0,
        symbol: 'C',
        x: 1,
        y: 6,
    })

    const d4 = world.spawn(dna.bot.Mech, {
        team: 0,
        symbol: 'D',
        x: 6,
        y: 6,
    })

    env.team[0].active = false
    env.team[2].active = false
    env.team[3].active = false
    env.team[4].active = false

    lab.mode.port1.target.team = 1
    lab.mode.port2.target.team = -1
    lab.mode.port3.target.team = 1
    lab.mode.port4.target.team = 0

    lab.mode.port1.focusOn(d1)

    d1.brain.order('ram neutrals')
}

function onCapture(source, context) {
    env.test.captured ++
    if (env.test.captured >= 3) {
        defer(() => {
            trap('nextTest')
        }, 2)
    }
}

function setup() {
    lab.mode.titleBar.title = name
    lab.mode.port1.lookAt(0, 0)
    lab.mode.port2.lookAt(8, 0)
    lab.mode.port3.lookAt(0, 8)
    lab.mode.port4.lookAt(8, 8)

    env.test = {
        captured: 0
    }
    job.mission.define('capture', onCapture)
}
