// @depends(dna/hud/Panel)

class SidePanel extends dna.hud.Panel {

    constructor(st) {
        super(st)
        this.name = 'sidePanel'
    }

    init() {
        this.adjust()
    }

    adjust() {
        const tx = this.__
        this.w = env.style.sidePanelWidth
        this.x = tx.tw - this.w

        let deltaHeight = 0
        if (tx.topPanel.hidden) {
            this.y = 0
        } else {
            this.y = 1
            deltaHeight --
        }

        if (!tx.statusBar.hidden) {
            deltaHeight --
        }

        this.h = tx.th + deltaHeight
    }

    draw() {
        const hero = this.world.hero
        const tx = this.__

        // fill the top bar
        tx
            .reset()
            .back(lib.cidx('baseLow'))
            .face(lib.cidx('alert'))

        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                tx
                    .at(this.x + x, this.y + y)
                    .out(' ')
            }
        }

        let x= this.x + 1
        let y = this.y + 1

        tx.at(x - 1, y++).print('[ Status ]')
        tx.at(x, y++).print('health:' + hero.health)
        tx.at(x, y++).print('pop.:' + env.status.population
            + '(' + env.status.followers + ')')
        tx.at(x, y++).print('rabbits:' + env.status.rabbits)
        tx.at(x, y++).print('pos:' + hero.x + 'x' + hero.y)
        y ++

        tx.at(x - 1, y++).print('[ Inventory ]')

        Object.keys(hero.pack.item).forEach(item => {
            const qty = hero.pack.item[item]

            if (qty > 0) {
                const label = item + ':' + qty
                const selected = hero.pack.isSelected(item)
                if (selected) {
                    tx.back(lib.cidx('alert'))
                      .face(lib.cidx('baseLow'))
                } else {
                    tx.back(lib.cidx('baseLow'))
                      .face(lib.cidx('alert'))
                }
                tx.at(x, y++).print(label)
            }
        })

        const w = this.w
        x = this.x
        y += 2
        tx.back(lib.cidx('baseLow'))
          .face(lib.cidx('alert'))
          .at(x, y++).print('[ Log ]')

        let i = hero.log.list.length - 1
        while(y < this.h && i >= 0) {
    
            function logMessage(msg, nx, nw) {
                if (msg.length > nw) {
                    const first = msg.substring(0, w)
                    const rest = msg.substring(w)
                    tx.at(nx, y++).print(msg)

                    if (nw === w) {
                        // shift
                        logMessage(rest, nx + 1, nw - 1)
                    } else {
                        logMessage(rest, nx, nw)
                    }

                } else {
                    tx.at(nx, y++).print(msg)
                }
            }

            const msg = hero.log.list[i--]
            logMessage(msg, x, w)
        }
    }
}
