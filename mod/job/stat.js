function start() {
    for (let i = 0; i <= env.tune.maxTeams; i++) {
        const units = env.team[i].unitsAlive()
        this.state.team[i].units = units
        this.state.team[i].original = units
    }
}

function captureCase(captured, context) {
    this.state.team[context.team].captured ++
    if (context.source.taken) {
        this.state.team[context.team].pcaptured ++
    }
}

function killCase(killed, context) {
    this.state.team[context.source.team].kills ++
    if (context.source.taken) {
        this.state.team[context.source.team].pkills ++
    }
    this.state.team[killed.team].lost ++
    if (killed.taken) {
        this.state.team[killed.team].plost ++
    }
}

function register(event, source, context) {
    const handler = event + 'Case'
    if (this[handler]) this[handler](source, context)
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
            captured:   0,
            kills:      0,
            lost:       0,
            pcaptured:  0,
            pkills:     0,
            plost:      0,
        }
    }
}

function teamStat() {
    if (this.state) return this.state.team
}

function determineWinner() {
    let left = 0
    let last = -1
    for (let i = 1; i < env.team.length; i++) {
        const team = env.team[i]
        if (!team.active) continue
        if (this.state.team[i].units > 0) {
            left ++
            last = i
            this.state.team[i].result = 'DRAW'
        } else {
            this.state.team[i].result = 'LOST'
        }
    }

    if (left === 1) {
        this.state.team[last].result = 'WIN'
        return last
    } else if (left > 1) {
        return -2 // draw
    } else if (left === 0) {
        return -1 // all eliminated
    }
}

function gameStat() {
    const stat = {
        team:       [],
        result:     [],
        Initial:    [],
        Captured:   [],
        Kills:      [],
        Lost:       [],
        Left:       [],
    }
    this.determineWinner()

    for (let i = 1; i < env.team.length; i++) {
        const team = env.team[i]
        if (!team.active) continue

        const tstat = this.state.team[i]
        function mark(key, val, pval) {
            const v = (pval && tstat[pval] > 0)?
                    `${tstat[val]}[${tstat[pval]}]` : `${tstat[val]}`
            stat[key].push(v)
        }

        stat.team.push(team.name)
        stat.result.push(tstat.result)

        mark('Initial', 'original')
        mark('Captured', 'captured', 'pcaptured')
        mark('Kills', 'kills', 'pkills')
        mark('Lost', 'lost', 'plost')
        mark('Left', 'units')
    }
    return stat
}

