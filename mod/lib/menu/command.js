function register(reg, team, targetDroid) {
    const list = lab.world.prop.select(e =>
        e instanceof dna.prop.Marker && e.team === team)
    let cur = targetDroid.brain.findRegVal(reg, list)

    list.push({
        none: true,
        title: '- none -',
    })

    if (cur < 0) cur = list.length - 1
    const firstName = list[cur].title || list[cur].name

    return {
        name: reg + ': ' + firstName,
        val: cur,

        actionNext: function() {
            this.val ++
            if (this.val >= list.length) this.val = 0
            this.updateTitle()
            this.sync(targetDroid)
        }, 
        actionPrev: function() {
            this.val --
            if (this.val < 0) this.val = list.length - 1
            this.updateTitle()
            this.sync(targetDroid)
        },
        updateTitle: function() {
            const e = list[this.val]
            const title = e.title || e.name
            this.name = reg + ': ' + title
        },
        sync: function(droid) {
            if (!droid || !droid.brain) throw 'missing droid or brain!'

            const e = list[this.val]
            if (e.none) {
                droid.brain[reg] = null
            } else {
                droid.brain[reg] = e
            }
        },
    }
}

function orders(targetDroid) {
    const list = env.tune.orders
    let cur = targetDroid.brain.iorders()

    return {
        name: list[cur],
        val: cur,

        actionNext: function() {
            this.val ++
            if (this.val >= list.length) this.val = 0
            this.sync(targetDroid)
            this.updateTitle()
        }, 
        actionPrev: function() {
            this.val --
            if (this.val < 0) this.val = list.length - 1
            this.sync(targetDroid)
            this.updateTitle()
        },
        sync: function(droid) {
            if (!droid || !droid.brain) throw 'missing droid or brain!'
            droid.brain.setOrders(list[this.val])
        },
        updateTitle: function() {
            this.name = targetDroid.brain.getOrders()
        },
    }
}

function mark(targetDroid) {
    return {
        name: 'mark',
        action: (menu) => {
            targetDroid.marker.mark()
            // TODO placement sfx
            menu.hide()
        },
    }
}

function formMenu(focusDroid, targetDroid) {
    const team = env.team.get(targetDroid.team)
    const iteam = team.id

    const config = {
        items: [
            orders(targetDroid),
            register('A', iteam, targetDroid),
            register('B', iteam, targetDroid),
            register('X', iteam, targetDroid),
            register('Z', iteam, targetDroid),
            mark(targetDroid),
            {
                name: 'exit',
                action: (menu) => {
                    menu.hide()
                },
            },
        ],
        onSelect: function(item, i) {
            log('selected: #' + i + ': ' + item.name)
            if (item.name === 'exit') {
            }
        },
        onHide: function() {
            this.port.show()
        },
        track: function() {
            if (targetDroid && targetDroid.dead) {
                // close the menu - we can't control a dead droid
                this.hide()
            }
        },
    }
    return config
}
