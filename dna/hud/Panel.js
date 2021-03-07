class Panel {

    constructor(st, df) {
        augment(this, df)
        augment(this, st)
    }

    background() {
        const tx = this.__
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                tx.put(x, y, ' ')
                tx.put(x, y, 0, 2)
                tx.put(x, y, 0, 3)
            }
        }
    }

    adjust() {
        this.x = 0
        this.y = 0
        this.w = this.__.tw
        this.h = this.__.th
    }

    hide() {
        this.hidden = true
        this.__.adjust()
    }

    show() {
        this.hidden = false
        this.__.adjust()
    }
}
