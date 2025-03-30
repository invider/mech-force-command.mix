const name = 'Training - Capture'

const opt = {
    w: 16,
    h: 16,
    base: ' ',
}

const pan = {}
const mechs = []

function genTerrain(world) {
    lib.ken.generateIsland(world, {
        width: opt.w,
        height: opt.h,

        dx: opt.seed * 427,
        dy: opt.seed * 8573,
        z: .8,

        scale: 15,
        level: {
            water: .11,
            sand:  .16,
            ice:   .18,
            stone: .37,
            mech:  1,
        },
        world: world,
    })

    /*
    world.spawn( dna.prop.Factory, { x: 52, y: 46 })
    world.spawn( dna.prop.Factory, { x: 71, y: 47 })
    world.spawn( dna.prop.Factory, { x: 53, y: 77 })
    world.spawn( dna.prop.Factory, { x: 84, y: 75 })

    world.spawn( dna.prop.Factory, { x: 67, y: 78 })
    world.spawn( dna.prop.Factory, { x: 60, y: 37 })
    */
}

function genSquads(world, opt) {
    const d1 = world.spawn(dna.bot.Mech, {
        team: 1,
        x: 5,
        y: 5,
    })
    pan.d1 = d1

    const m1 = world.spawn(dna.bot.Mech, {
        team: 0,
        x: 8,
        y: 5,
    })
    mechs.push(m1)

    const m2 = world.spawn(dna.bot.Mech, {
        team: 0,
        x: 9,
        y: 11,
    })
    mechs.push(m2)

    const m3 = world.spawn(dna.bot.Mech, {
        team: 0,
        x: 4,
        y: 8,
    })
    mechs.push(m3)

    env.team[0].active = false
    env.team[2].active = false
    env.team[3].active = false
    env.team[4].active = false
    lab.mode.port1.target.team = 1
    lab.mode.port2.target.team = 1
    lab.mode.port3.target.team = 1
    lab.mode.port4.target.team = 1
}

function onCapture(mech, opt) {
    log(mech.title + ' captured by [' + opt.source.title + ']')
}

function setup() {
    job.mission.define('capture', onCapture)

    const d1 = pan.d1
    lab.mode.port1.takeControl(d1)
    lab.mode.port2.focusOn(d1)
    lab.mode.port3.focusOn(d1)
    lab.mode.port4.focusOn(d1)
}

function isComplete() {
    const captured = mechs.reduce((acc, cur) => {
        return (cur.team > 0)? acc + 1 : acc
    }, 0)
    return captured >= 3
}
