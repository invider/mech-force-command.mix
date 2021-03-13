// @depends(dna/behavior/Behavior)
class EmptyBrain extends dna.behavior.Behavior {

    start() {}

    behave() {
        this.status = "i'm stupid"
    }

    finish() {}
}
