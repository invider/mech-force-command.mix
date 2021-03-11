// @depends(dna/behavior/Behavior)
class PathWalker extends dna.behavior.Behavior {

    behave() {
        const nextStep = this.pathFinder.nextStep()
        this.move.dir(nextStep)
    }

}
