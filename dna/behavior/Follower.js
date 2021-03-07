// @depends(dna/behavior/Behavior)
class Follower extends dna.behavior.Behavior {

    followHero(world, mob) {
        const dir = world.intent.dir(0, mob.x, mob.y, false)
        if (dir >= 0) {
            mob.move.dir(dir)
            mob.status = 'following the hero'
        } else {
            this.behavior.randomStep()
        }
    }

    behave() {
        const mob = this
        const world = this._

        const proximity = world.intent.get(0, mob.x, mob.y)

        if (proximity < 1) {
            this.behavior.randomStep()
            return

        } else if (proximity > 0 && proximity < 3) {
            mob.status = 'standing near the hero'
            return
        }

        mob.behavior.followHero(world, mob)
    }

}

