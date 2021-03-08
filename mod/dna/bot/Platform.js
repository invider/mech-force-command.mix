// @depends(dna/bot/Mob)

const df = {
    symbol: 'P',
    status: '',
    health: 10,
    maxHealth: 10,
}

let id = 0
class Platform extends dna.bot.Mob {

    constructor(st) {
        super( augment({}, df, st) )
        this.attach(dna.pod.move)
        this.attach(dna.behavior.RandomWalker)
    }

    push(e) {
        //log(e.name + ' is pushed by ' + this.name)
    }

    next() {
        if (this.behave) this.behave()
        /*
        const dir = RND(3)
        this.move.dir(dir)
        */
    }

    infect(n) {
        if (!n) n = 1
        this.health -= n

        if (this.health <= 0) {
            this.kill()
        }
    }

    log() {}

    kill() {
        this.dead = true
        log(`${this.name} has died!`)
    }

    getStatus() {
        if (this.status) return this.name + ' - ' + this.status
        else return this.name
    }
}
