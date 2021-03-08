const LEFT = 1
const RIGHT = 2

const df = {
    x: 0,
    y: 0,
    h: 10,
    stick: LEFT,
}

class VerticalSeparator {

    constructor(st) {
        augment(this, df, st)
    }

    adjust() {
        if (!this.stick || !this.target) return

        this.y = this.target.y
        this.h = this.target.h
        switch(this.stick) {
            case LEFT:
                this.x = this.target.x - 1
                break
            case RIGHT:
                this.x = this.target.x + this.target.w + 1
                break
        }
    }

    draw() {
        const tx = this.tx
        tx
            .reset()
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))

        for (let i = 0; i < this.h; i++) {
            tx
                .at(this.x, this.y + i)
                .out('|')
        }
    }
}
