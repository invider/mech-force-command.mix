function ui() {
    const tx = lab.mode

    const background = tx.spawn(dna.hud.Panel, {
        Z: 1,
    })

    const titleBar = tx.spawn(dna.hud.TitleBar, {
        Z: 8,
        hidden: true
    })
    const statusBar = tx.spawn(dna.hud.StatusBar, {
        Z: 9,
        hidden: true
    })
    //tx.spawn(dna.hud.SidePanel, { hidden: true })

    const port1 = tx.spawn('hud/ViewPort', {
        Z: 10,
        hidden: true,
        stick: 'top-left',
        target: {
            leader: true,
            team: 1,
        }
    })
    const port2 = tx.spawn('hud/ViewPort', {
        Z: 11,
        hidden: true,
        stick: 'top-right',
        target: {
            leader: true,
            team: 2,
        }
    })
    const port3 = tx.spawn('hud/ViewPort', {
        Z: 12,
        hidden: true,
        stick: 'bottom-left',
        target: {
            leader: true,
            team: 3,
        }
    })
    const port4 = tx.spawn('hud/ViewPort', {
        Z: 13,
        hidden: true,
        stick: 'bottom-right',
        target: {
            free: true,
            team: -1,
            //leader: true,
            //team: 3,
        }
    })

    const vs1 = tx.spawn('hud/VerticalSeparator', {
        Z: 21,
        name: 'vs1',
        target: port2,
    })
    const vs2 = tx.spawn('hud/VerticalSeparator', {
        Z: 22,
        name: 'vs2',
        target: port4,
    })
    const hs1 = tx.spawn('hud/HorizontalSeparator', {
        Z: 23,
        name: 'hs1',
        target: port3,
    })
    const hs2 = tx.spawn('hud/HorizontalSeparator', {
        Z: 24,
        name: 'hs2',
        target: port4,
    })

    lab.screenKeeper.define('game', [
        titleBar, statusBar,
        port1, port2, port3, port4,
        vs1, vs2, hs1, hs2,
    ])
    //tx.spawn(dna.hud.DebugPanel)

    return this
}
