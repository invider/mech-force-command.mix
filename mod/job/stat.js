function start() {
    for (let i = 0; i <= env.tune.maxTeams; i++) {
        const units = env.team[i].unitsAlive()
        this.state.team[i].units = units
        this.state.team[i].original = units
        this.state.team[i].captured = 0
    }
}

function captureCase(captured, context) {
    this.state.team[context.team].captured ++
}

function killCase(killed, context) {
    this.state.team[context.source.team].kills ++
    this.state.team[killed.team].destroyed ++
}

function register(event, source, context) {
    const handler = event + 'Case'
    if (this[handler]) this[handler](source, context)
}

function teamStat() {
    if (this.state) return this.state.team
}

function next() {
    let activeTeams = 0
    for (let i = 0; i <= env.tune.maxTeams; i++) {
        const units = env.team[i].unitsAlive()
        this.state.team[i].units = units
        if (i > 0 && units > 0) activeTeams++
    }
    
    if (activeTeams < 2
            && env.state !== 'gameover'
            && !env.config.test
            && !env.config.box) {
        defer(() => trap('gameover'), env.tune.gameoverDelay)
    }
}

function reset() {
    this.state = {
        team: [],
    }
    for (let i = 0; i <= env.tune.maxTeams; i++) {
        this.state.team[i] = {
            units:      0,
            original:   0,
            kills:      0,
            destroyed:  0,
        }
    }
}
