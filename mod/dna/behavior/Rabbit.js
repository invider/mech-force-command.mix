// @depends(dna/behavior/Behavior)
class Rabbit extends dna.behavior.Behavior {

    behave() {
        const mob = this
        const world = this._

        if (this.food < env.tune.rabbitProcreateFood) {
            mob.behavior.randomStep()
            mob.status = 'looking for food'
        } else {
            mob.behavior.randomStep()
            mob.status = 'looking for mate'
        }
        /*
        
        const proximity = world.intent.get(1, mob.x, mob.y)
        mob.status = 'looking for something @' + proximity

        if (proximity === 0) {
            mob.move.dir(RND(3))
            mob.status = 'looking for altar'
            return
        }
        if (proximity > 0 && proximity < 3) {
            mob.status = 'standing near altar'
            return
        }

        const dir = world.intent.min(1, mob.x, mob.y)
        if (dir >= 0) {
            mob.move.dir(dir)
            mob.status = 'moving towards altar'
        } else {
            mob.move.dir(RND(3))
        }
        */
    }

}
