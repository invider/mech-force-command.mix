function newGame(opt) {
    const map = opt.map
    //log(`starting a new game on map #${map}`)

    const fade = opt.fade || {}
    fade.onHide = function() {
        lib.factory.world(map)
    }
    lab.control.state.fadeTo('game', fade)
}
