const name = "Range o'Range"

const opt = {
    w: 12,
    h: 12,
    base: '.',
}

function genTerrain(world, opt) {
    lib.ken.generateSquare(world, opt)
}

function genSquads(world, opt) {
    const leader1 = world.spawn(dna.bot.Mech, {
        team: 1,
        name: 'left-leader',
        symbol: 'L',
        x: 2,
        y: 5,
    })
    lab.mode.port1.focusOn(leader1)

    const leader2 = world.spawn(dna.bot.Mech, {
        team: 2,
        name: 'right-leader',
        symbol: 'R',
        x: 8,
        y: 5,
    })
    lab.mode.port2.focusOn(leader2)

    const leader3 = world.spawn(dna.bot.Mech, {
        team: 3,
        name: 'top-leader',
        symbol: 'T',
        x: 5,
        y: 0,
    })
    lab.mode.port3.focusOn(leader3)

    const leader4 = world.spawn(dna.bot.Mech, {
        team: 4,
        name: 'down-leader',
        symbol: 'D',
        x: 6,
        y: 9,
    })
    lab.mode.port4.focusOn(leader4)
}

let kills = 0
function setup() {
    _.sce.test.util.setTitle(name)

    kills = 0
    job.mission.define('kill', (source, context) => {
        kills ++
        if (kills > 2) trap('nextTest')
    })
}
