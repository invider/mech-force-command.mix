// @depends(dna/behavior/Behavior)

function nope(bot) {
    log.warn(`[${bot.orders}] - not implemented!`)
}

function fire(bot) {
    // no fire for neutrals - they are peaceful
    if (bot.team <= 0) return

    const foe = bot.scanner.scanForEnemy()
    if (foe) {
        // watttack!!!
        bot.status = 'attacking [' + foe.team + '/' + foe.name + ']'
        //log(`[${this.name}] ${this.status}`)
        bot.gun.shot(foe)

    } else {
        bot.status = 'skipping attack'
    }
}

function searchAndDestroy(bot) {
    if (bot.steps > 0) {
        bot.steps --
    } else {
        bot.steps = RND(5)
        bot.action = RND(5)
    }

    if (bot.action <= 3) {
        bot.move.dir(RND(3))
        bot.status = 'walking around'

    } else if (bot.action === 4) {
        // just skip and wait
    } else {
        fire(bot)
    }
}

function holdTheGround(bot) {
    if (bot.steps > 0) {
        bot.steps --
    } else {
        bot.steps = RND(1, 5)
        bot.action = RND(1)
    }

    if (bot.action === 0) {
        // just skip and wait
    } else {
        fire(bot)
    }
}

function followPath(bot) {
    // move along existing path
    const nextStep = bot.pathFinder.nextStep()
    //log('next step: ' + env.bind.actionName(nextStep))

    if (nextStep >= 0) {
        // got it!
        bot.move.dir(nextStep)
    } else if (nextStep < -10) {
        const waypoint = bot.brain.firstRegVal()
        if (waypoint) {
            const path = bot.pathFinder.findPath(waypoint.x, waypoint.y)
            bot.brain.resetFirstReg()
            bot.status = 'following path'

        } else {
            bot.brain.orders = 'hold the ground'
            log(`[${bot.title}] switching to hold the ground procedure`)
            // TODO sfx/reporting
        }
    } else {
        // no movement provided - just skip this turn
    }
}

const orderActions = {
    'search & destroy': searchAndDestroy,
    'hold the ground':  holdTheGround,
    'follow path':      followPath,
    'patrol path':      nope,
    'ram neutrals':     nope,
    'gather parts':     nope,
}

class Fighter extends dna.behavior.Behavior {

    // NOTE the behavior run in the context of platform, not the pod
    behave() {
        if (this.taken) return

        const orders = this.brain.getOrders()
        const actions = orderActions[orders]
        if (actions) actions(this)
    }
}
