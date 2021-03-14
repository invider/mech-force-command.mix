// @depends(dna/behavior/Behavior)

function nope(mech) {
    log.warn(`[${mech.brain.orders}] - not implemented!`)
}

function moveTowards(mech, target) {
    if (!target) return

    if (mech.y < target.y) mech.move.dir(_.DOWN)
    else if (mech.y > target.y) mech.move.dir(_.UP)
    else if (mech.x < target.x) mech.move.dir(_.RIGHT)
    else if (mech.x > target.x) mech.move.dir(_.LEFT)
}

function ram(mech) {
    const target = targetNeutral(mech)
    if (!target || target.dead || target.team !== 0) return null
    mech.status = 'ramming ' + target.title
    moveTowards(mech, target)
    mech.brain.steps ++
    if (mech.brain.steps > 20) mech.brain.steps = 0
}

function fire(mech) {
    // no fire for neutrals - they are peaceful
    if (mech.team <= 0) return null

    const foe = mech.scanner.scanForEnemy()
    if (foe) {
        // watttack!!!
        mech.status = 'attacking [' + foe.team + '/' + foe.name + ']'
        //log(`[${this.name}] ${this.status}`)
        mech.gun.shot(foe)
        return foe

    } else {
        return null
    }
}

function targetNeutral(mech) {
    if (mech.team <= 0) return null // must be in a team
    const neutral = mech.scanner.scanForNeutrals()
    if (neutral) {
        mech.brain.target = neutral
    } else {
        mech.brain.target = null
    }
    return neutral
}

function holdPattern(mech) {
    mech.brain.order('hold the ground')
    log(`[${mech.title}] switching to hold the ground pattern`)
    // TODO sfx/reporting
}

function takeCombatAction(mech) {
    return fire(mech)
}

function takeRamAction(mech) {
    const neutral = ram(mech)
    if (!neutral) {
        mech.brain.steps = 0
    }
    return neutral
}

function searchAndDestroy(mech) {
    if (mech.steps > 0) {
        mech.steps --
    } else {
        mech.steps = RND(5)
        mech.action = RND(5)
    }

    if (mech.action <= 3) {
        mech.move.dir(RND(3))
        mech.status = 'walking around'

    } else if (mech.action === 4) {
        // just skip and wait
    } else {
        fire(mech)
    }
}

function holdTheGround(mech) {
    if (mech.steps > 0) {
        // move in random dir for the starters
        mech.steps --
        mech.move.dir(RND(3))
        mech.status = 'taking a holding position'
    } else {
        fire(mech)
        mech.status = 'holding the ground'
    }
}

function plotPath(mech, waypoint) {
    return mech.pathFinder.findPath(waypoint.x, waypoint.y)
}

function reachTarget(mech, target) {
    if (!target) return true
    const d = lib.calc.mdist(mech.x, mech.y, target.x, target.y)
    if (d > 3) return false

    // reached the target!
    job.report.success('reached the target', mech, target)
    job.mission.on('reached', mech, { target })
    mech.lsfx('reached')
    return true
}

function follow(mech, patrol) {
    //if (!mech.brain.target) log('no target')
    //else log(mech.brain.target.title)

    let nextStep = -1
    mech.brain.steps ++
    if (mech.brain.steps > 5) {
        let target
        target = takeCombatAction(mech)
        if (!target) target = takeRamAction(mech)
        if (!target) {
            mech.brain.steps = 0
        }
        return
    }

    // determine if there is a failed action cached
    if (mech.cache.retry) {
        mech.cache.retriesLeft --
        if (mech.cache.retriesLeft < 0) {
            // reevaluate path!
            mech.cache.retry = false
            const path = plotPath(mech, mech.brain.target)
            if (path) {
                if (patrol) {
                    mech.status = 'patroling path'
                } else {
                    mech.status = 'following path'
                }
            } else {
                // unable to reach!
                if (!mech.brain.target) log('no target!')
                else log('unable to plot path to ' + mech.brain.target.title)
                holdPattern(mech)
            }

        } else {
            nextStep = mech.cache.retryMove
        }
    }
    
    if (nextStep < 0) {
        // get the next step from path finder
        nextStep = mech.pathFinder.nextStep()
    }

    if (nextStep >= 0) {
        // move along existing path
        const moved = mech.move.dir(nextStep)
        if (!moved) {
            if (!mech.cache.retry) {
                mech.cache.retry = true
                mech.cache.retryMove = nextStep
                mech.cache.retriesLeft = 3
            }
        } else {
            mech.cache.retry = false
        }

    } else if (nextStep < -10) {
        const reached = reachTarget(mech, mech.pathFinder.target)
        if (!reached) {
            // reevaluate!
            const path = plotPath(mech, mech.brain.target)
            if (!path) {
                // unable to reach!
                holdPattern(mech)
            }
        }

        let waypoint
        if (patrol) {
            waypoint = mech.brain.ireg(mech.brain.state++)
            if (mech.brain.state >= 4) mech.brain.state = 0
        } else {
            waypoint = mech.brain.firstRegVal()
        }

        if (waypoint) {
            const path = plotPath(mech, waypoint)
            if (path) {
                mech.brain.target = waypoint
                if (patrol) {
                    mech.status = 'patroling path'
                } else {
                    mech.brain.resetFirstReg()
                    mech.status = 'following path'
                }
            } else {
                // unable to reach!
                holdPattern(mech)
            }
        } else {
            if (patrol) {
                // just skip to the next turn
            } else {
                holdPattern(mech)
            }
        }
    } else {
        // no movement provided - just skip this turn
    }
}

function followPath(mech) {
    follow(mech, false)
}

function patrolPath(mech) {
    follow(mech, true)
}

function ramNeutrals(mech) {
    if (!mech.brain.target) {
        const target = targetNeutral(mech)
        if (!target) {
            searchAndDestroy(mech)
        }
    } else {
        // already have target
        const target = mech.brain.target
        if (target.dead || target.team !== 0) {
            // forget about it - it's already dead or captured
            mech.brain.target = null
        } else {
            mech.status = 'ramming ' + target.title
            moveTowards(mech, target)
            mech.brain.steps ++
            if (mech.brain.steps > 20) mech.brain.target = null
        }
    }
}

const orderActions = {
    'search & destroy': searchAndDestroy,
    'hold the ground':  holdTheGround,
    'follow path':      followPath,
    'patrol path':      patrolPath,
    'ram neutrals':     ramNeutrals,
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
