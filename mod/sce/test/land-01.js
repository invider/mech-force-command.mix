
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
        name: 'left-leader',
        symbol: 'L',
        x: 2,
        y: 2,
    })
    env.team[1].setLeader(leader1)

    const leader2 = world.spawn(dna.bot.Droid, {
        id:   2,
        team: 2,
        name: 'right-leader',
        symbol: 'R',
        x: 6,
        y: 2,
    })
    env.team[2].setLeader(leader2)
}