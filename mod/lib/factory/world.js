function generateTerrain(world, opt) {
    lib.ken.generateIsland(world, {
        width: opt.w || env.tune.defaultSegmentWidth,
        height: opt.h || env.tune.defaultSegmentHeight,

        dx: opt.seed * 727,
        dy: opt.seed * 571,
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

function teams() {
    env.team = []
    for (let i = 0; i < env.tune.maxTeams + 1; i++) {
        env.team.push( new dna.Team() )
    }
}

function intents() {
    /*
    world.attach(new dna.bad.Intent({
        world: world,
        w: world.segment.w,
        h: world.segment.h,
    }))
    */
}


let leaderId = 0
function placeLeader(world, base, team) {
    // find a palce for the hero
    let sx = -1
    let sy = -1

    for (let y = 0; y < world.height; y++) {
        for (let x = 0; x < world.width; x++) {
            const land = world.get(x, y)
            if (land === base) {
                sx = x
                sy = y
            }
            if (sx >= 0 && sy >= 0) break
        }
        if (sx >= 0 && sy >= 0) break
    }
    if (sx < 0 || sy < 0) throw 'no place to land the leader!'

    const leader = world.spawn(dna.bot.Droid, {
        id: leaderId,
        team: team,
        name: 'leader' + (++leaderId),
        symbol: 'H',
        x: sx,
        y: sy,
    })
    env.team[team].setLeader(leader)
    //lab.mode['port' + leaderId].follow = hero
    //leader.takeControl()
    return leader
}

function leaders(world, opt) {
    const base = opt.base || '_'
    placeLeader(world, base, 1)
    placeLeader(world, base, 2)
    placeLeader(world, base, 3)
    placeLeader(world, base, 4)
}

function bind() {
    lab.mode._ls.forEach(e => e.world = lab.world)
    //lab.mode.port1.follow = lab.world.hero
    //lib.util.bindAllPlayers()
}

// accepts map # from the menu to generate
function world(imap) {
    teams()

    // determine map config
    if (!imap) imap = 0
    const defaultConfig = $.sce.map[0]
    let config
    if (!env.config.test) {
        log('=== MAP #' + imap + ' ===')
        config = augment({}, defaultConfig, $.sce.map[imap])
    } else {
        log('=== TEST #' + env.config.test + ' ===')
        config = augment({}, defaultConfig, $.sce.test.map[env.config.test])
    }
    if (!config.opt.seed) config.opt.seed = imap - 1

    const world = lab.spawn('World')
    intents(world)

    if (config.genTerrain) config.genTerrain(world, config.opt)
    else generateTerrain(world, config.opt)

    if (config.genSquads) config.genSquads(world, config.opt)
    else leaders(world, config.opt)

    bind()

    return world
}
