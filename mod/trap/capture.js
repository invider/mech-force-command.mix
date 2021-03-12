function capture(player) {
    if (!lab.world || lab.world.disabled) return
    //log('trying to capture control for player #' + player)
    lab.mode.apply(e => {
        if (e.capture) e.capture(player)
    })
}
