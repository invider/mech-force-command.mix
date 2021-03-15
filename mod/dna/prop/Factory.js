// @depends(dna/prop/Prop)

const df = {
    symbol: '$',
    productivity: .025,
}

class Factory extends dna.prop.Prop {

    constructor(st) {
        super( augment({}, df, st) )
    }

    next() {
        // maybe spawn something?
        if (rnd() < this.productivity && !this._.isOccupied(this.x, this.y)) {
            this._.spawn( dna.bot.Mech, {
                team: 0,
                x: this.x,
                y: this.y,
            })
        }
    }
}
