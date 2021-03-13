const ON = 0.0000001
const OFF = 0

const MAX_ACTIONS = 32
const REPEAT_SPACE = 1

const ctrl = []
const timers = []

const playerMap = []

function bind(target, player) {
    player = player || 0
    log('binding #' + player + ' -> ' + target.name)
    target.playerId = player
    playerMap[player] = target
    if (!ctrl[player]) {
        ctrl[player] = []
        timers[player] = []
    }
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
        // try to capture the port
        trap('capture', player)
    }

    if (ctrl[player] && !ctrl[player][action]) {
        ctrl[player][action] = ON
        timers[player][action] = env.time
        timers[player][REPEAT_SPACE * MAX_ACTIONS + action] = 0

        const target = playerMap[player]
        if (target) {
            if (target.activate) {
                target.activate(action)
            }
        }
    }
}

function stop(action, player) {
    if (!player) player = 0
    if (ctrl[player]) {
        ctrl[player][action] = OFF

        const target = playerMap[player]
        if (target && target.deactivate) {
            const pressTime = env.time - timers[player][action]
            target.deactivate(action, pressTime)
        }
    }
}

function resetFor(target) {
    const player = playerMap.indexOf(target)
    if (player < 0) return
    for (let a = 0; a < ctrl[player].length; a++) {
        ctrl[player][a] = OFF
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
                        const repeat = ++timers[p][REPEAT_SPACE * MAX_ACTIONS + a]

                        if (target.act) {
                            const pressTime = env.time - timers[p][a]
                            target.act(a, repeat, pressTime)
                        }
                        ctrl[p][a] = env.tune.keyRepeat
                    }
                }
            }
        }
    }
    /*
    // debug control triggers
    const tx = lab.mode
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
