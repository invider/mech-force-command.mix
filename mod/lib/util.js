function bindAllPlayers() {
    throw 'not supported'
    /*
    lab.control.player.bind(0, lab.world.hero)
    lab.control.player.bind(1, lab.world.hero)
    lab.control.player.bind(2, lab.world.hero)
    */
}

function unbindAllPlayers() {
    throw 'not supported'
    /*
    lab.control.player.bind(0, false)
    lab.control.player.bind(1, false)
    lab.control.player.bind(2, false)
    */
}

function packArray(src) {
    if (!isArray(src)) throw 'array is expected!'
    const res = []
    src.forEach(e => {
        if (e !== undefined && e !== null) res.push(e)
    })
    return res
}
