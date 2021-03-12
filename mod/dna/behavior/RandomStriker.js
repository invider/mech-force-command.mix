// @depends(dna/behavior/Behavior)
class RandomStriker extends dna.behavior.Behavior {

    // NOTE the behavior run in the context of platform, not the pod
    behave() {
        if (this.taken) return

        if (this.steps > 0) {
            this.steps --
        } else {
            this.steps = RND(5)
            this.action = RND(5)
        }

        if (this.action <= 3) {
            this.move.dir(RND(3))
            this.status = 'walking around'

        } else if (this.action === 4) {
            // just skip

        } else {
            // no fire for neutrals - they are peaceful
            if (this.team <= 0) return

            const foe = this.scanner.scanForEnemy()
            if (foe) {
                // watttack!!!
                this.status = 'attacking [' + foe.team + '/' + foe.name + ']'
                //log(`[${this.name}] ${this.status}`)
                this.gun.shot(foe)

            } else {
                this.status = 'skipping attack'
            }
        }
    }

}
