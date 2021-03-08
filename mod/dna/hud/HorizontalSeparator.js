const TOP = 1
const BOTTOM = 2

const df = {
    x: 0,
    y: 0,
    w: 10,
    stick: TOP,
}

class HorizontalSeparator {

    constructor(st) {
        augment(this, df, st)
    }

    adjust() {
        if (!this.stick || !this.target) return

        this.x = this.target.x
        this.w = this.target.w
        switch(this.stick) {
            case TOP:
                this.y = this.target.y - 1
                break
            case BOTTOM:
                this.y = this.target.y + this.target.h + 1
                break
        }
    }

    draw() {
        const tx = this.tx
        tx
            .reset()
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))

        for (let i = 0; i < this.w; i++) {
            tx
                .at(this.x + i, this.y)
                .out('-')
        }
    }
}
