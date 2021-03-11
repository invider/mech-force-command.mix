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
    const leader1 = world.spawn(dna.bot.Droid, {
        id:   1,
        team: 1,
        name: 'left-leader',
        symbol: 'L',
        x: 2,
        y: 5,
    })
    env.team[1].setLeader(leader1)

    const leader2 = world.spawn(dna.bot.Droid, {
        id:   2,
        team: 2,
        name: 'right-leader',
        symbol: 'R',
        x: 8,
        y: 5,
    })
    env.team[2].setLeader(leader2)

    const leader3 = world.spawn(dna.bot.Droid, {
        id:   3,
        team: 3,
        name: 'top-leader',
        symbol: 'T',
        x: 5,
        y: 0,
    })
    env.team[3].setLeader(leader3)

    const leader4 = world.spawn(dna.bot.Droid, {
        id:   4,
        team: 4,
        name: 'down-leader',
        symbol: 'D',
        x: 6,
        y: 9,
    })
    env.team[4].setLeader(leader4)
}

let kills = 0
function setup() {
    kills = 0
    lab.control.mission.define('kill', (source, context) => {
        kills ++
        if (env.config.test === true && kills > 2) trap('levelUp')
    })
}
