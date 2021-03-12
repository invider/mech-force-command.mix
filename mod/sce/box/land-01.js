
const name = 'You have control!'

const opt = {
    w: 8,
    h: 8,
    base: '.',
}

function genTerrain(world, opt) {
    lib.ken.generateSquare(world, opt)
}

function genSquads(world, opt) {
    const leader1 = world.spawn(dna.bot.Droid, {
        team: 2,
        symbol: 'A',
        x: 2,
        y: 2,
    })
    env.team[2].focusOn(leader1)

    const d2 = world.spawn(dna.bot.Droid, {
        team: 2,
        symbol: 'B',
        x: 7,
        y: 2,
    })
}

function setup() {
    lab.mode.titleBar.title = name
    lab.mode.port1.lookAt(0, 0)
    lab.mode.port2.lookAt(8, 0)
    lab.mode.port3.lookAt(0, 8)
    lab.mode.port4.lookAt(8, 8)
}
