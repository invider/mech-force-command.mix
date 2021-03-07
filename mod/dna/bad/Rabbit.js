// @depends(dna/bad/LifeForm)

let id = 0

class Rabbit extends dna.bad.LifeForm {

    constructor(st) {
        super(st)

        this.name = 'Rabbit ' + (++id)
        this.symbol = 'r'
        this.health = 20
        this.food = 0
        this.sperm = 0

        this.attach(dna.behavior.Rabbit)
    }

    land(l) {
        if (this.food < env.tune.rabbitProcreateFood
                    && l === '"') {
            this.food ++
            if (this.food === env.tune.rabbitProcreateFood) {
                this.sperm = 1
            }
            this._.set(this.x, this.y, '.')
        }
    }

    push(e) {
        if (e instanceof Rabbit
                && e.sperm > 0
                && this.sperm > 0) {
            // jump random
            const px = this.x
            const py = this.y
            const moved = this.move.dir(RND(3))
            if (moved) {
                log('baby for ' + this.name + ' and ' + e.name)
                this.sperm --
                e.sperm --

                this._.spawn(new dna.bad.Rabbit({
                    x: px,
                    y: py,
                }))
            }
        }
    }
}
