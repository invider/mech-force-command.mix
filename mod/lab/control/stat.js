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
        this.state.team[i] = {}
        this.state.team[i].units = 0
    }
}
