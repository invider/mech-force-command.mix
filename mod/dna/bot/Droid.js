// @depends(dna/bot/Platform)

const df = {
    symbol: 'D',
    kind: 'droid',
    health: 100,
}

let id = 0
class Droid extends dna.bot.Platform {

    constructor(st) {
        super( augment({}, df, st) )
        if (!this.name) this.name = 'droid' + (++id)
        this.attach(dna.pod.lfx)
        this.attach(dna.pod.gun)
        this.attach(dna.pod.scanner)
        this.attach(dna.pod.move)
        this.attach(dna.behavior.RandomStriker)
    }

    takeControl() {
        this.symbol = '@'
        this.detach(this.behavior) // disable AI
        this.attach(dna.pod.control)
        this.attach(dna.pod.totalControl)
        lab.control.player.bind(this, this.id)
    }

    releaseControl() {
        this.attach(dna.behavior.RandomWalker)
        this.detach(this.totalControl)
    }

    hit(source, force) {
        this.health -= force
        this.lfx.light(.8, .01, .6)
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
            kill(this)
        }
    }
}
