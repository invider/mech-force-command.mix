// @depends(dna/hud/Panel)

class StatusBar extends dna.hud.Panel {

    constructor(st) {
        super(st)
        this.name = 'statusBar'
    }

    adjust() {}

    pick() {
        return this.__.pick(mouse.x, mouse.y)
    }

    matchLabel(target) {
        if (target.getStatus) return target.getStatus()
        if (target.name) return target.name
        if (target.symbol) {
            switch(target.symbol) {
                case 'o': return 'Stone';
                case '*': return 'Food';
            }
        }
    }

    draw() {
        const hero = this.world.hero
        const tx = this.__
        const w = tx.tw
        const y = tx.th - 1

        // fill the top bar
        tx
            .reset()
            .at(0, y)
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))

        for (let x = 0; x < w; x++) {
            tx.out(' ')
        }

        let label = ''
        /*
        let label = 'OK'
        if (hero.health < 100)  {
            label = 'Damaged'
        }
        */

        const target = this.pick()
        if (target) label = this.matchLabel(target)

        tx
            .face(lib.cidx('alert'))
            .at(0, y)
            .print(label)
    }
}
