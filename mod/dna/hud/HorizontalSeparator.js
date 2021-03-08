const UP = 1
const DOWN = 2

const df = {
    x: 0,
    y: 0,
    w: 10,
    stick: UP,
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
            case UP:
                this.y = this.target.y - 1
                break
            case DOWN:
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
