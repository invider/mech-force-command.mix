// @depends(dna/behavior/Behavior)
class RandomStriker extends dna.behavior.Behavior {

    // NOTE the behavior run in the context of platform, not the pod
    behave() {
        if (this.taken) return

        const action = RND(4)

        if (action <= 3) {
            this.move.dir(RND(3))
            this.status = 'walking around'
        } else {
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
