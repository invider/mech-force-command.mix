const ON = .000001
const OFF = 0

const ctrl = []

const playerMap = []

function bind(player, target) {
    log('binding #' + player + ' -> ' + target.name)
    playerMap[player] = target
    if (!ctrl[player]) ctrl[player] = []
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

        const hero = playerMap[player]
        if (hero && hero.control.activate) {
            hero.control.activate(action)
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
        for (let a = 0; a < ctrl[p].length; a++) {
            if (ctrl[p][a]) {
                ctrl[p][a] -= dt
                if (ctrl[p][a] <= 0) {
                    const hero = playerMap[p]
                    if (hero) hero.control.act(a)
                    ctrl[p][a] = env.tune.keyRepeat
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
