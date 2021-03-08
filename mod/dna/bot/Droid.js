// @depends(dna/bot/Platform)

let id = 0
class Droid extends dna.bot.Platform {

    constructor(st) {
        super(st)
        if (!this.name) this.name = 'droid' + (++id)
        this.symbol = 'D'
    }

    takeControl() {
        this.symbol = '@'
        this.detach(this.behavior)
        this.attach(dna.pod.control)
        this.attach(dna.pod.totalControl)
        lab.control.player.bind(this.id, this)
    }

    releaseControl() {
        this.attach(this.randomWalker)
        this.detach(this.totalControl)
    }
}
