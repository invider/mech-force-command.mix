// @depends(dna/hud/Panel)

const df = {
    name: 'titleBar',
}

class TitleBar extends dna.hud.Panel {

    constructor(st) {
        super( augment({}, df, st) )
    }

    adjust() {}

    show() {
        this.hidden = false
        lab.world.show()
    }

    hide() {
        this.hidden = true
        if (lab.world) lab.world.hide()
    }

    draw() {
        const world = this.world
        const hero = world.hero
        const tx = this.__
        const w = tx.tw

        // fill the top bar
        tx
            .reset()
            .at(0, 0)
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))

        for (let x = 0; x < w; x++) {
            tx.out(' ')
        }

        if (this.title) {
            tx
                .face(lib.cidx('alert'))
                .at(0, 0)
                .print(this.title)
        }

        let turn = 'Turn:' + world.turn
        if (world.scheduled) turn += '<' + world.scheduled
        tx.at(w - 10, 0).print(turn)

        /*
        tx.at(1, 0).print('' + this.world.hero.x + ':'
                        + this.world.hero.y + '     ')
        */
    }
}
