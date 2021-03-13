function teamStat() {
    if (this.state) return this.state.team
}

function next() {
    for (let i = 0; i <= env.tune.maxTeams; i++) {
        this.state.team[i].units = env.team[i].unitsAlive()
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
