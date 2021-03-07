class CentralMessage {

    constructor(st) {
        augment(this, st)
    }

    adjust() {}

    draw() {
        const tx = this.__
        const w = tx.tw - lab.textMode.sidePanel.w
        const h = tx.th
        const len = this.label.length

        tx
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))
            .at(ceil(w/2 - len/2), floor(h/2))
            .mode(1).set({
                period: .5,
            })
            .print(this.label)
    }
}
