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
        const team = new dna.Team()
        env.team.push( team )
        team.active = true    // TODO level responsiblity
    }

    env.team.get = function(n) {
        const team = this[n]
        if (!team) return this[0]
        return team
    }
    env.team.getName = function(n) {
        return this.get(n).name
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
    //env.team[team].focusOn(leader)
    //lab.mode['port' + leaderId].follow = hero
    //leader.takeControl()
    return leader
}

function leaders(world, opt) {
    const base = opt.base || '_'
    /*
    placeLeader(world, base, 1)
    placeLeader(world, base, 2)
    placeLeader(world, base, 3)
    placeLeader(world, base, 4)
    */
}

function bindToHUD() {
    lab.mode._ls.forEach(e => e.world = lab.world)
    //lab.mode.port1.follow = lab.world.hero
    //lib.util.bindAllPlayers()
}

function cleanup() {
    env.state = 'plaing'
    job.serial.reset()
    lab.control.stat.reset()
    lab.control.mission.clear()
    if (lab.world) lab.detach(lab.world) // clean up the old world
}

function determineConfig(imap) {
    // determine map config
    imap = imap || 0
    if (isString(imap)) imap = parseInt(imap)
    env.imap = imap
    const defaultConfig = $.sce.land[0]

    let config
    if (imap < env.tune.testRange) {
        log('=== MAP #' + imap + ' ===')
        const fineConfig = $.sce.land[imap]
        if (fineConfig) log('Config OK...')
        else log('No Config!')
        config = extend({}, defaultConfig, fineConfig)

    } else if (imap < env.tune.boxRange) {
        const itest = imap - env.tune.testRange
        log('=== TEST #' + itest + ' ===')
        const fineConfig = $.sce.test.land[itest]
        if (fineConfig) log('Config OK...')
        else log('No Config!')
        config = extend({}, defaultConfig, fineConfig)
    } else {
        const ibox = imap - env.tune.boxRange
        log('=== BOX #' + ibox + ' ===')
        const fineConfig = $.sce.box.land[ibox]
        if (fineConfig) log('Config OK...')
        else log('No Config!')
        config = extend({}, defaultConfig, fineConfig)
    }
    if (!config.opt.seed) config.opt.seed = imap - 1

    return config
}

function bringInFocus() {
    lab.mode.apply(e => {
        if (e instanceof dna.hud.ViewPort) {
            const team = env.team[e.id]
            if (team && team.active) {
                e.jump(1, true)
            }
        }
    })
}

// accepts map # from the menu to generate
function world(imap) {
    cleanup()

    const config = determineConfig(imap)

    teams()

    const world = lab.spawn('World')
    intents(world)

    if (config.genTerrain) config.genTerrain(world, config.opt)
    else generateTerrain(world, config.opt)

    if (config.genSquads) config.genSquads(world, config.opt)
    else leaders(world, config.opt)

    if (config.setup) config.setup(world, config.opt)

    bindToHUD()
    bringInFocus()

    return world
}
