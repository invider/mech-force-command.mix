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
    
    env.ports = []
    const port1 = tx.spawn('hud/ViewPort', {
        Z: 10,
        hidden: true,
        stick: 'top-left',
        target: {
            leader: true,
            team: 1,
        }
    })
    env.ports.push(port1)

    const title1 = tx.spawn('hud/ViewPortTitle', {
        Z: 15,
        name: 'title1',
        hidden: true,
        port: port1,
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
    env.ports.push(port2)

    const title2 = tx.spawn('hud/ViewPortTitle', {
        Z: 16,
        name: 'title2',
        hidden: true,
        port: port2,
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
    env.ports.push(port3)

    const title3 = tx.spawn('hud/ViewPortTitle', {
        Z: 17,
        name: 'title3',
        hidden: true,
        port: port3,
    })

    const port4 = tx.spawn('hud/ViewPort', {
        Z: 13,
        hidden: true,
        stick: 'bottom-right',
        port: {
            x: 18,
            y: 18,
        },
        target: {
            free: true,
            team: -1,
            //leader: true,
            //team: 3,
        },
    })
    env.ports.push(port4)

    const title4 = tx.spawn('hud/ViewPortTitle', {
        Z: 18,
        name: 'title4',
        hidden: true,
        port: port4,
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
        target: title3,
    })
    const hs2 = tx.spawn('hud/HorizontalSeparator', {
        Z: 24,
        name: 'hs2',
        target: title4,
    })

    lab.control.state.define('game', [
        titleBar, statusBar,
        port1, port2, port3, port4,
        title1, title2, title3, title4,
        vs1, vs2, hs1, hs2,
    ])
    //tx.spawn(dna.hud.DebugPanel)

    return this
}
