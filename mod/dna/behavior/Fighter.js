// @depends(dna/behavior/Behavior)

function nope(bot) {
    log.warn(`[${bot.orders}] - not implemented!`)
}

function fire(bot) {
    // no fire for neutrals - they are peaceful
    if (bot.team <= 0) return null

    const foe = bot.scanner.scanForEnemy()
    if (foe) {
        // watttack!!!
        bot.status = 'attacking [' + foe.team + '/' + foe.name + ']'
        //log(`[${this.name}] ${this.status}`)
        bot.gun.shot(foe)
        return foe

    } else {
        bot.status = 'skipping attack'
        return null
    }
}

function holdPattern(bot) {
    bot.brain.order('hold the ground')
    log(`[${bot.title}] switching to hold the ground pattern`)
    // TODO sfx/reporting
}

function takeCombatAction(bot) {
    const foe = fire(bot)
    if (!foe) {
        bot.brain.steps = 0
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

function plotPath(bot, waypoint) {
    return bot.pathFinder.findPath(waypoint.x, waypoint.y)
}

function reachTarget(bot, target) {
    if (!target) return true
    const d = lib.calc.mdist(bot.x, bot.y, target.x, target.y)
    if (d > 3) return false

    // reached the target!
    lab.control.report.success('reached the target', bot, target)
    lab.control.mission.on('reached', bot, { target })
}

function follow(bot, patrol) {

    let nextStep = -1
    bot.brain.steps ++
    if (bot.brain.steps > 5) {
        takeCombatAction(bot)
        return
    }

    // determine if there is a failed action cached
    if (bot.cache.retry) {
        bot.cache.retriesLeft --
        if (bot.cache.retriesLeft < 0) {
            // reevaluate path!
            bot.cache.retry = false
            const path = plotPath(bot, bot.brain.target)
            if (path) {
                if (patrol) {
                    bot.status = 'patroling path'
                } else {
                    bot.status = 'following path'
                }
            } else {
                // unable to reach!
                holdPattern(bot)
            }

        } else {
            nextStep = bot.cache.retryMove
        }
    }
    
    if (nextStep < 0) {
        // get the next step from path finder
        nextStep = bot.pathFinder.nextStep()
    }

    if (nextStep >= 0) {
        // move along existing path
        const moved = bot.move.dir(nextStep)
        if (!moved) {
            if (!bot.cache.retry) {
                bot.cache.retry = true
                bot.cache.retryMove = nextStep
                bot.cache.retriesLeft = 3
            }
        } else {
            bot.cache.retry = false
        }

    } else if (nextStep < -10) {
        const reached = reachTarget(bot, bot.brain.target)
        if (!reached) {
            // reevaluate!
            const path = plotPath(bot, bot.brain.target)
            if (!path) {
                // unable to reach!
                holdPattern(bot)
            }
        }

        let waypoint
        if (patrol) {
            waypoint = bot.brain.ireg(bot.brain.state++)
            if (bot.brain.state >= 4) bot.brain.state = 0
        } else {
            waypoint = bot.brain.firstRegVal()
        }

        if (waypoint) {
            const path = plotPath(bot, waypoint)
            if (path) {
                bot.brain.target = waypoint
                if (patrol) {
                    bot.status = 'patroling path'
                } else {
                    bot.brain.resetFirstReg()
                    bot.status = 'following path'
                }
            } else {
                // unable to reach!
                holdPattern(bot)
            }
        } else {
            if (patrol) {
                // just skip to the next turn
            } else {
                holdPattern(bot)
            }
        }
    } else {
        // no movement provided - just skip this turn
    }
}

function followPath(bot) {
    follow(bot, false)
}

function patrolPath(bot) {
    follow(bot, true)
}

const orderActions = {
    'search & destroy': searchAndDestroy,
    'hold the ground':  holdTheGround,
    'follow path':      followPath,
    'patrol path':      patrolPath,
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
