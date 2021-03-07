// @depends(dna/Mob)

let id = 0

class LifeForm extends dna.Mob {

    constructor(st) {
        super(st)
        this.symbol = 'f'
        this.status = ''
        this.health = 10
        this.maxHealth = 10
        this.attach(dna.pod.move)
        this.attach(dna.behavior.RandomWalker)
    }

    push(e) {
        log(e.name + ' is pushed by ' + this.name)
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
