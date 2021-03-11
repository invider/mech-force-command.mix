// @depends(dna/behavior/Behavior)
class PathWalker extends dna.behavior.Behavior {

    behave() {
        const nextStep = this.pathFinder.nextStep()
        if (nextStep >= 0) this.move.dir(nextStep)
    }

}
