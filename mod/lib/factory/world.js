function generateTerrain(world, island, difficulty) {
    $.lib.ken.generateIsland({
        width: env.tune.defaultSegmentWidth,
        height: env.tune.defaultSegmentHeight,

        dx: island * 727,
        dy: island * 571,
        z: .2,

        scale: 11,
        level: {
            water: .1,
            sand: .14,
            stone: .75,
            ice: .3,
        },
        world: world,
    })
}


let heroId = 0
function placeHero() {
    const world = lab.world
    // find a palce for the hero
    let sx = -1
    let sy = -1
    let land

    for (let y = 0; y < world.height; y++) {
        for (let x = 0; x < world.width; x++) {
            land = world.get(x, y)
            if (land === '_') {
                sx = x
                sy = y
            }
            if (sx >= 0 && sy >= 0) break
        }
        if (sx >= 0 && sy >= 0) break
    }
    if (sx < 0 || sy < 0) throw 'no place to land the hero!'

    const hero = world.spawn(dna.bot.Droid, {
        id: heroId,
        name: 'hero' + (++heroId),
        x: sx,
        y: sy,
    })
    lab.textMode['port' + heroId].follow = hero
    //hero.takeControl()
}

function bind() {
    lab.textMode._ls.forEach(e => e.world = lab.world)
    //lab.textMode.port1.follow = lab.world.hero
    //lib.util.bindAllPlayers()
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

    placeHero()
    placeHero()
    bind()

    return world
}
