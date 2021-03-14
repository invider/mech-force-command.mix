
const name = 'Shooting Range'

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
        id:   1,
        team: 1,
        symbol: 'L',
        x: 2,
        y: 2,
    })
    lab.mode.port1.focusOn(leader1)

    const leader2 = world.spawn(dna.bot.Droid, {
        id:   2,
        team: 2,
        symbol: 'R',
        x: 6,
        y: 2,
    })
    lab.mode.port2.focusOn(leader2)
}

function setup() {
    lab.mode.titleBar.title = name
    job.mission.define('kill', (source, context) => {
        if (env.config.test === true) trap('nextTest')
    })
}
