// @depends(dna/prop/Prop)

const df = {
    solid:  false,
    touchable: true,
    symbol: 'o',
    kind:   'energy pack',
}

class Drop extends dna.prop.Prop {

    constructor(st) {
        super( augment({}, df, st) )
        if (this.spread) {
            this.ox = this.x
            this.oy = this.y
            this.dx = 0
            this.dy = 0
            this.dir = TAU * rnd()
            this.speed = 1.2
        }
    }

    touch(source) {
        if (this.spread > 0) return
        if (source.kind !== 'mech') return true
        source.pickup(this)
        kill(this)
        return true
    }

    next() {
        if (!this.spread) return
        this.dx += cos(this.dir) * this.speed
        this.dy += sin(this.dir) * this.speed
        this.x = floor(this.ox + this.dx)
        this.y = floor(this.oy + this.dy)
        if (!this._.isWalkable(this.x, this.y)) {
            kill(this)
        }
        this.spread --
    }
}
