function register(reg, team, targetMech) {
    const list = lab.world.prop.select(e =>
        e instanceof dna.prop.Marker && e.team === team)
    let cur = targetMech.brain.findRegVal(reg, list)

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
            this.sync(targetMech)
        }, 
        actionPrev: function() {
            this.val --
            if (this.val < 0) this.val = list.length - 1
            this.updateTitle()
            this.sync(targetMech)
        },
        updateTitle: function() {
            const e = list[this.val]
            const title = e.title || e.name
            this.name = reg + ': ' + title
        },
        sync: function(mech) {
            if (!mech || !mech.brain) throw 'missing mech or brain!'

            const e = list[this.val]
            if (e.none) {
                mech.brain[reg] = null
            } else {
                mech.brain[reg] = e
            }
        },
    }
}

function orders(targetMech) {
    const list = env.tune.orders
    let cur = targetMech.brain.iorders()

    return {
        name: list[cur],
        val: cur,

        actionNext: function() {
            this.val ++
            if (this.val >= list.length) this.val = 0
            this.sync(targetMech)
            this.updateTitle()
        }, 
        actionPrev: function() {
            this.val --
            if (this.val < 0) this.val = list.length - 1
            this.sync(targetMech)
            this.updateTitle()
        },
        sync: function(mech) {
            if (!mech || !mech.brain) throw 'missing mech or brain!'
            mech.brain.setOrders(list[this.val])
        },
        updateTitle: function() {
            this.name = targetMech.brain.getOrders()
        },
    }
}

function mark(targetMech) {
    return {
        name: 'mark',
        silent: true,
        action: (menu) => {
            targetMech.marker.mark()
            // TODO placement sfx
            menu.hide()
        },
    }
}

function formMenu(focusMech, targetMech) {
    const team = env.team.get(targetMech.team)
    const iteam = team.id

    const config = {
        items: [
            orders(targetMech),
            register('A', iteam, targetMech),
            register('B', iteam, targetMech),
            register('X', iteam, targetMech),
            register('Z', iteam, targetMech),
            mark(targetMech),
            {
                name: 'exit',
                silent: true,
                action: (menu) => {
                    menu.hide()
                    lib.sfx('close')
                },
            },
        ],
        onSelect: function(item, i) {
            log('selected: #' + i + ': ' + item.name)
        },
        onHide: function() {
            this.port.show()
        },
        track: function() {
            if (targetMech && targetMech.dead) {
                // close the menu - we can't control a dead mech
                this.hide()
                lib.sfx('close')
            }
        },
    }
    return config
}
