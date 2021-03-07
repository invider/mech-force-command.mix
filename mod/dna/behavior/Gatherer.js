// @depends(dna/behavior/Behavior)
class Gatherer extends dna.behavior.Behavior {

    awayFromAltar(world, mob) {
        const dir = world.intent.dir(1, mob.x, mob.y, true)
        if (dir >= 0) {
            mob.move.dir(dir)
            mob.status = 'moving away from altar'
        } else {
            mob.behavior.randomStep()
        }
    }

    towardsAltar(world, mob) {
        const dir = world.intent.dir(1, mob.x, mob.y, false)
        if (dir >= 0) {
            mob.move.dir(dir)
            mob.status = 'moving towards an altar'
        } else {
            mob.behavior.randomStep()
        }
    }

    behave() {
        const mob = this
        const pod = mob.behavior
        const world = this._

        const proximity = world.intent.get(1, mob.x, mob.y)

        if (!mob.goal || mob.goal === 'gathering') {

            if (proximity < 8) {
                pod.awayFromAltar(world, mob)
            } else {
                pod.randomStep()
                mob.status = 'looking for food and stones'
            }

            if (mob.pack.itemCount >= env.tune.altarMinimum) {
                mob.goal = 'toAltar'
            }

        } else if (mob.goal === 'toAltar') {

            if (!proximity) {
                // nothing in vicinity
                this.behavior.randomStep()
                mob.status = 'looking for an altar'

            } else if (proximity > 0 && proximity < 4) {
                mob.goal = 'dropping'
                mob.skipLoot = true
                mob.status = 'standing near altar'

            } else {
                // an altar in vicinity
                mob.skipLoot = true
                pod.towardsAltar(world, mob)
            }

        } else if (mob.goal === 'dropping') {
            this.behavior.randomStep()
            this.pack.dropAny()

            if (this.pack.itemCount === 0) {
                mob.goal = 'fromAltar'
            }

        } else if (mob.goal === 'fromAltar') {
            if (proximity === 0 || proximity > 8) {
                mob.skipLoot = false
                mob.goal = 'gather'
                pod.randomStep()

            } else {
                pod.awayFromAltar(world, mob)
            }
        }
    }
}

