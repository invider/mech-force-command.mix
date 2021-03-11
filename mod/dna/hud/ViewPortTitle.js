// @depends(dna/hud/Panel)

class ViewPortTitle extends dna.hud.Panel {

    constructor(st) {
        super(st)
    }

    adjust() {
        this.x = this.port.x
        this.y = this.port.y - 1
        this.w = this.port.w
        this.h = 1
    }

    draw() {
        const world = this.world
        const tx = this.__

        let team = this.port.target.team || 0
        if (team < 0) team = 0
        const color = pal.team[team].color

        // fill the top bar
        tx
            .reset()
            .at(this.x, this.y)
            .back(color)
            .face(lib.cidx('baseLow'))

        for (let x = 0; x < this.w; x++) {
            tx.out(' ')
        }

        const cx = this.port.cx()
        const cy = this.port.cy()
        const name = this.port.follow? this.port.follow.name : ''

        tx.at(this.x, this.y).print(cx + ':' + cy + ' ' + name)
    }
}
