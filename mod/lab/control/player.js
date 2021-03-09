const ON = .000001
const OFF = 0

const ctrl = []

const playerMap = []

function bind(target, player) {
    player = player || 0
    log('binding #' + player + ' -> ' + target.name)
    target.playerId = player
    playerMap[player] = target
    if (!ctrl[player]) ctrl[player] = []
}

function bindAll(target) {
    for (let i = 0; i < env.tune.players; i++) {
        this.bind(target, i)
    }
}

function unbind(player) {
    player = player || 0
    const target = playerMap[player]
    if (target) {
        log('unbinding #' + player)
        target.playerId = -1
        playerMap[player] = null
    }
}

function unbindAll() {
    for (let i = 0; i < env.tune.players; i++) {
        this.unbind(i)
    }
}

function act(action, player) {
    if (!player) player = 0

    if (!playerMap[player]) {
        // nothing is binded for the player
        // try to capture the faction
        log('trying to capture control for player #' + player)
        trap('capture', player + 1)
    }

    if (ctrl[player] && !ctrl[player][action]) {
        ctrl[player][action] = ON

        const target = playerMap[player]
        if (target) {
            if (target.control) {
                if (target.control.activate) {
                    target.control.activate(action)
                }
            } else if (target.activate) {
                target.activate(action)
            }
        }
    }
}

function stop(action, player) {
    if (!player) player = 0
    if (ctrl[player]) {
        ctrl[player][action] = OFF
    }
}

function evo(dt) {

    for (let p = 0; p < ctrl.length; p++) {
        if (!ctrl[p]) continue
        for (let a = 0; a < ctrl[p].length; a++) {
            if (ctrl[p][a]) {
                ctrl[p][a] -= dt
                if (ctrl[p][a] <= 0) {
                    const target = playerMap[p]
                    if (target) {
                        if (target.control) {
                            if (target.control.act) {
                                target.control.act(a)
                            }
                        } else if (target.act) {
                            target.act(a)
                        }
                        ctrl[p][a] = env.tune.keyRepeat
                    }
                }
            }
        }
    }
    /*
    // debug control triggers
    const tx = lab.textMode
    tx.reset().at(0, 4)

    for (let p = 0; p < ctrl.length; p++) {
        for (let i = 0; i < ctrl[p].length; i++) {
            tx.println('#' + i + ':' + ctrl[p][i])
        }
    }
    */
}

function dump() {
    for (let i = 0; i < playerMap.length; i++) {
        const target = playerMap[i]
        if (target) {
            log.raw(`#${i}: ${target.name}`)
        } else {
            log.raw(`#${i}: unbinded`)
        }
    }
}
