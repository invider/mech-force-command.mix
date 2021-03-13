// @depends(dna/bot/Platform)

const df = {
    symbol: 'D',
    kind: 'droid',
    health: 100,
}

class Droid extends dna.bot.Platform {

    constructor(st) {
        super( augment({}, df, st) )

        const team = env.team.get(this.team)
        const serialId = team.nextSerial()

        if (!this.name) {
            this.name = env.team.getName(this.team)
                + '-droid-' + serialId
        }
        if (!this.title) {
            this.title = env.team.getName(this.team)
                + ' droid ' + serialId
        }
        this.attach(dna.pod.brain)
        this.attach(dna.pod.cache)
        this.attach(dna.pod.marker)
        this.attach(dna.pod.pathFinder)
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
        this.lfx.light(.8, .01, .6)

        if (this.god) return

        this.health -= force
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
            switch(this.team) {
                case 1: lib.sfx.at('capture1', this.__.x, this.__.y); break;
                case 2: lib.sfx.at('capture2', this.__.x, this.__.y); break;
                case 3: lib.sfx.at('capture3', this.__.x, this.__.y); break;
                case 4: lib.sfx.at('capture4', this.__.x, this.__.y); break;
                default: case 1: lib.sfx.at('capture1', this.__.x, this.__.y);
            }

        } else if (target.team === this.__.team) {
            // TODO only if this bot is taken...
            // TODO mark the bot for interfacing
            // TODO interfacing sfx
        }
    }
}
