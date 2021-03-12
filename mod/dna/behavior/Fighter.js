// @depends(dna/behavior/Behavior)

function nope(bot) {
    log.warn('orders are not implemented!')
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

const orderActions = {
    'search & destroy': searchAndDestroy,
    'hold the ground':  holdTheGround,
    'follow path':      nope,
    'patrol path':      nope,
    'ram neutrals':     nope,
    'gather parts':     nope,
}

class Fighter extends dna.behavior.Behavior {

    // NOTE the behavior run in the context of platform, not the pod
    behave() {
        if (this.taken) return

        const orders = this.memory.getOrders()
        const actions = orderActions[orders]
        if (actions) actions(this)
    }
}
