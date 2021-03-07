// @depends(dna/hud/Panel)

class DebugPanel extends dna.hud.Panel {

    constructor(st) {
        super(st)
        this.name = 'debugPanel'
    }

    adjust() {}

    draw() {
        const world = this.world
        const hero = world.hero
        const tx = this.__

        let mx = tx.lx(mouse.x)
        let my = tx.ly(mouse.y)

        if (mx >= tx.tw) mx = -1
        if (my >= tx.th) my = -1

        tx.at(0, 0).print(`M:${mx}:${my}`)
        if (mx >= 0 && my >=0) {
            tx.put(mx, my, 'X')
        }
    }
}
