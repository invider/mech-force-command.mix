function generateTerrain(world, opt) {
    $.lib.ken.generateIsland({
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


let leaderId = 0
function placeLeader(team) {
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

function bind() {
    lab.mode._ls.forEach(e => e.world = lab.world)
    //lab.mode.port1.follow = lab.world.hero
    //lib.util.bindAllPlayers()
}

// accepts map # from the menu to generate
function world(imap) {
    if (!imap) imap = 0

    const defaultConfig = $.sce.map[0]
    const config = augment({}, defaultConfig, $.sce.map[imap])
    if (!config.seed) config.seed = imap - 1

    const world = lab.spawn('World')
    generateTerrain(world, config.opt)

    world.attach(new dna.bad.Intent({
        world: world,
        w: world.segment.w,
        h: world.segment.h,
    }))

    teams()

    placeLeader(1)
    placeLeader(2)
    placeLeader(3)
    placeLeader(4)

    bind()

    return world
}
