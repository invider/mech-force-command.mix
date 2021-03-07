function ui() {
    const tx = lab.textMode

    const titleBar = tx.spawn(dna.hud.TitleBar, { hidden: true })
    const statusBar = tx.spawn(dna.hud.StatusBar, { hidden: true })
    //tx.spawn(dna.hud.SidePanel, { hidden: true })

    const port1 = tx.spawn('hud/ViewPort', {
        name: 'port1',
        stick: 'left',
        tx: tx,
    })
    const port2 = tx.spawn('hud/ViewPort', {
        name: 'port2',
        stick: 'right',
        tx: tx,
    })

    lab.screenKeeper.define('game', [ titleBar, statusBar, port1 ])
    //tx.spawn(dna.hud.DebugPanel)

    return this
}
