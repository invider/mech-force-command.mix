// @depends(dna/bot/Platform)

const df = {
    symbol: 'D',
    kind: 'droid',
}

let id = 0
class Droid extends dna.bot.Platform {

    constructor(st) {
        super( augment({}, df, st) )
        if (!this.name) this.name = 'droid' + (++id)
        this.attach(dna.pod.scanner)
        this.attach(dna.pod.move)
        this.attach(dna.behavior.RandomWalker)
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
