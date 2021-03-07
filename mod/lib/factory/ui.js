function ui() {
    const tx = lab.textMode

    const titleBar = tx.spawn(dna.hud.TitleBar, { hidden: true })
    const statusBar = tx.spawn(dna.hud.StatusBar, { hidden: true })
    //tx.spawn(dna.hud.SidePanel, { hidden: true })

    const viewPort = tx.spawn('hud/ViewPort', {
        tx: tx,
        hidden: true,
    })
    lab.screenKeeper.define('game', [ titleBar, statusBar, viewPort ])
    //tx.spawn(dna.hud.DebugPanel)

    return this
}
