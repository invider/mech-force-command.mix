function gameover() {
    lab.world.paused = true
    lib.util.unbindAllPlayers()

    lab.textMode.spawn(dna.hud.CentralMessage, {
        label: 'Game Over',
    })
}
