// @depends(dna/hud/Panel)

const df = {
    selected: 0,
    title: '',
    subtitle: '',
}

class Menu extends dna.hud.Panel {

    constructor(st) {
        super(st, df)

        this.control = {
            __: this,
            act: function() {},
            activate: function(action) {
                switch(action) {
                    case 0: this.__.selectPrev(); break;
                    case 2: this.__.selectNext(); break;
                    case 1: this.__.actionPrev(); break;
                    case 3: this.__.actionNext(); break;
                    case 6: this.__.action(); break;
                }
            }
        }
    }

    adjust() {
        if (this.port) {
            this.x = this.port.x
            this.y = this.port.y
            this.w = this.port.w
            this.h = this.port.h
        } else {
            this.x = 0
            this.y = 0
            this.w = this.__.tw
            this.h = this.__.th
        }
    }

    normalizeItems() {
        const list = []
        this.items.forEach(item => {
            if (isString(item)) {
                list.push({
                    name: item,
                })
            } else {
                list.push(item)
            }
        })
        this.items = list
    }

    selectNext() {
        this.selected ++
        if (this.selected >= this.items.length) this.selectFirst()
        sfx('move', .6)
    }

    selectPrev() {
        this.selected --
        if (this.selected < 0) this.selectLast()
        sfx('move', .6)
    }

    selectFirst() {
        this.selected = 0
        sfx('move', .6)
    }

    selectLast() {
        this.selected = this.items.length - 1
        sfx('move', .6)
    }

    action() {
        const item = this.items[this.selected]
        if (item) {
            if (item.action) {
                item.action(this)
            } else if (this.onSelect) {
                this.onSelect(item, this.selected)
            }
        }
        sfx('beep2', .6)
    }

    actionNext() {
        const item = this.items[this.selected]
        if (item && item.actionNext) item.actionNext(this)
        sfx('move2', .4)
    }

    actionPrev() {
        const item = this.items[this.selected]
        if (item && item.actionPrev) item.actionPrev(this)
        sfx('move2', .4)
    }

    bind() {
        if (this.port && this.port.target) {
            const player = this.port.target.team - 1
            log('binding menu to #' + player)
            lab.control.player.bind(this, player)
        } else {
            log('binding menu controls')
            lab.control.player.bindAll(this)
        }
    }

    show() {
        const menu = this
        this.hidden = false
        this.bind()
    }

    unbind() {
        if (this.port) {
            const player = this.port.target.team
            log('unbinding menu from #' + player)
            lab.control.player.unbind(player)
        } else {
            log('unbinding menu controls')
            lab.control.player.unbindAll()
        }
    }

    hide() {
        const menu = this
        menu.unbind()
        this.hidden = true
        if (this.onHide) this.onHide()
    }

    defineItems(opt) {
        //this.track = null
        //this.onSelect = null
        //this.onHide = null
        //augment(this, opt)
        this.track    = opt.track
        this.onSelect = opt.onSelect
        this.onHide   = opt.onHide
        this.items    = opt.items

        this.normalizeItems()
    }

    selectFrom(opt) {
        if (opt) this.defineItems(opt)
        this.show()
    }

    selectMore(opt) {
        const menu = this
        lab.spawn(dna.hud.Transition, {
            Z: 1001,
            fadein: .5,
            keep: .5,
            fadeout: .5,

            onFadeout: function() {
                menu.defineItems(opt)
            },
        })
    }

    evo(dt) {
        if (this.hidden) return
        if (this.track) this.track(dt)
    }

    draw() {
        const tx = this.__
        const len = this.items.length
        this.background()

        // title
        let y = floor(tx.th * .25)
        let x = floor(tx.tw/2 - this.title.length/2)
        tx.back(lib.cidx('base'))
            .face(lib.cidx('alert'))
            .at(x, y).print(this.title)

        // subtitle
        y = floor(tx.th * .9)
        x = floor(tx.tw - this.subtitle.length)
        tx.back(lib.cidx('base'))
            .face(lib.cidx('alert'))
            .at(x, y).print(this.subtitle)
            

        y = floor(this.h/2 - len/2)

        for (let i = 0; i < len; i++) {
            const item = this.items[i]
            const x = this.x + round(this.w/2 - item.name.length/2)
            
            if (i === this.selected) {
                tx.back(lib.cidx('alert'))
                  .face(lib.cidx('base'))
            } else {
                tx.back(lib.cidx('base'))
                  .face(lib.cidx('alert'))
            }
            tx.at(x, y).print(item.name)
            y += 2
        }
    }
}
