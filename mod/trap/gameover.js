function gameover() {
    if (env.state === 'gameover') return

    log('=== GAME OVER ===')
    env.state = 'gameover'
    lab.mode.mainMenu.defineItems(lib.menu.main)

    lab.control.state.fadeTo('gameover')
    /*
    lab.world.paused = true
    lib.util.unbindAllPlayers()

    lab.mode.spawn(dna.hud.CentralMessage, {
        label: 'Game Over',
    })
    */
}
