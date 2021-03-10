function newGame(opt) {
    const map = opt.map
    //log(`starting a new game on map #${map}`)

    const fade = opt.fade || {}
    fade.onShow = function() {
        lib.factory.world(map)
    }
    lab.control.state.fadeTo('game', fade)
}
