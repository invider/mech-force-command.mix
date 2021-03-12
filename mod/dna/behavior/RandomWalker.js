// @depends(dna/behavior/Behavior)
class RandomWalker extends dna.behavior.Behavior {

    behave() {
        if (this.taken) return
        this.behavior.randomStep()
    }

}
