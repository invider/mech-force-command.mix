const name = 'Training - Waypoints'

const opt = {
    w: 16,
    h: 16,
    base: ' ',
}

const pan = {}
const waypoints = []

function genTerrain(world) {
    lib.ken.generateIsland(world, {
        width: opt.w,
        height: opt.h,

        dx: opt.seed * 745,
        dy: opt.seed * 3871,
        z: .7,

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

    pan.m1 = world.spawn(dna.prop.Marker, {
        id:   1,
        team: 1,
        x: 11,
        y: 5,
    })
    waypoints.push(pan.m1)

    pan.m2 = world.spawn(dna.prop.Marker, {
        id:   2,
        team: 1,
        x: 9,
        y: 11,
    })
    waypoints.push(pan.m2)

    pan.m3 = world.spawn(dna.prop.Marker, {
        id:   3,
        team: 1,
        x: 7,
        y: 7,
    })
    waypoints.push(pan.m3)

    env.team[0].active = false
    env.team[2].active = false
    env.team[3].active = false
    env.team[4].active = false
    lab.mode.port1.target.team = 1
    lab.mode.port2.target.team = 1
    lab.mode.port3.target.team = 1
    lab.mode.port4.target.team = 1
}

function matchWaypoint(x, y) {
    let res
    waypoints.forEach(w => {
        if (w.x === x && w.y === y) res = w
    })
    return res
}

function onReach(mech, opt) {
    const marker = matchWaypoint(opt.target.x, opt.target.y)
    if (!marker) return

    log(mech.title + ' reached [' + marker.title + ']')
    marker.reachedFlag = true
}

function setup() {
    job.mission.define('reached', onReach)

    const d1 = pan.d1
    lab.mode.port1.takeControl(d1)
    lab.mode.port2.focusOn(d1)
    lab.mode.port3.focusOn(d1)
    lab.mode.port4.focusOn(d1)
}

function isComplete() {
    const reached = waypoints.reduce((acc, cur) => {
        return (cur.reachedFlag)? acc + 1 : acc
    }, 0)
    return reached >= 3
}
