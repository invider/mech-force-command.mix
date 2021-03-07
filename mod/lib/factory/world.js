function generateTerrain(world, island, difficulty) {
    $.lib.gen.generateIsland({
        width: env.tune.defaultSegmentWidth,
        height: env.tune.defaultSegmentHeight,

        dx: island * 727,
        dy: island * 571,
        z: .2,

        scale: 11,
        level: {
            water: .1,
            sand: .14,
            stone: .2,
            ice: .3,

            rocks: .7,
            islanders: .78,
            rabbits: .73,
        },
        world: world,
    })
}

function hero() {
    const world = lab.world
    // find a palce for the hero
    let x = 0
    let y = 0
    let land
    while (land !== '.') {
        land = world.getLand(x++, y++)
    }

    world.hero = world.spawn(dna.bad.Hero, {
        name: 'Hero',
        x: x,
        y: y,
    })

    // provide some food
    for (let i = 0; i < 4; i++) {
        world.hero.pack.provide('food')
    }
}

function spreadInfection(difficulty) {
    const world = lab.world
    const infected = world.infected

    let n = 3
    switch (difficulty) {
        case 2: n = 5; break;
        case 3: n = 11; break;
    }

    let last
    for (let i = 0; i < n; i++) {
        if (last) {
            let last = infected.jump(last.x, last.y, 1, 15)
        } else {
            let last = infected.jump(world.hero.x, world.hero.y, 1, 3)
        }
    }
}

function bind() {
    lab.textMode._ls.forEach(e => e.world = lab.world)
    lab.textMode.viewPort.follow = lab.world.hero
    lib.util.bindAllPlayers()
}

function world(island, difficulty) {
    if (!island) island = 0
    else island -= 1
    if (!difficulty) difficulty = 1

    const world = lab.spawn('World')
    generateTerrain(world, island, difficulty)

    world.attach(new dna.bad.Intent({
        world: world,
        w: world.segment.w,
        h: world.segment.h,
    }))

    world.attach(new dna.bad.Infected({
        world: world,
        w: world.segment.w,
        h: world.segment.h,
    }))
    world.ghost.link(world.infected)
    
    hero()

    spreadInfection(difficulty)

    bind()

    return world
}
