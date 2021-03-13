// @depends(dna/bot/Platform)

const df = {
    symbol: 'D',
    kind: 'droid',
    health: 100,
}

class Droid extends dna.bot.Platform {

    constructor(st) {
        super( augment({}, df, st) )
        if (!this.name) this.name = 'droid' + job.serial('droid')
        if (!this.title) {
            const team = env.team[this.team]
            if (team) {
                this.title = team.name + ' droid ' + team.nextSerial()
                if (!team.name) throw 'missing name for team #' + team.id
            } else {
                this.title = 'neutral ' + this.name
            }
        }
        this.attach(dna.pod.memory)
        this.attach(dna.pod.marker)
        this.attach(dna.pod.path)
        this.attach(dna.pod.lfx)
        this.attach(dna.pod.gun)
        this.attach(dna.pod.scanner)
        this.attach(dna.pod.move)
        this.attach(dna.pod.control)
        this.attach(dna.pod.totalControl)
        this.attach(dna.behavior.Fighter)
    }

    /*
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
    */

    fsfx(name, vol) {
        if (lab.mode.port1.inFocus(this)) {
            lib.sfx(name, vol)
        }
    }

    hit(source, force) {
        this.health -= force
        this.lfx.light(.8, .01, .6)
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
            kill(this)
            lab.control.mission.on('kill', this, {
                source,
            })
            lib.sfx.at('explosion7', this.x, this.y)
        }
    }

    push(target) {
        if (this.team === 0) return
        if (!target || target.kind !== 'droid') return

        if (target.team === 0) {
            // interface and capture the bot!
            log(`${target.title} is captured by ${this.name}`)
            target.team = this.team
            lib.sfx.at('capture', this.__.x, this.__.y)
        } else if (target.team === this.__.team) {
            // TODO only if this bot is taken...
            // TODO mark the bot for interfacing
            // TODO interfacing sfx
        }
    }
}
