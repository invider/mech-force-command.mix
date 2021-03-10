function newGame(opt) {
    const level = opt.level
    log(`starting a new game on map #${level}`)

    lib.factory.world(level)

    lab.screenKeeper.fadeTo('game', opt.fade)
}
