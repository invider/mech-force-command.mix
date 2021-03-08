const alias = 'scanner'

function onInstall() {
}

function scanArea(r) {
    r = r || 7
    return lab.world.getEntitiesWithin(this.__.x, this.__.y, r)
}

function scanForEnemy(r) {
    const ls = this.scanArea(r)

    const team = this.__.team
    const enemies = ls.filter(e => e.kind === 'droid'
                && e.team && e.team !== team)
    // TODO get sorted by distance!
    if (enemies.length > 0) return lib.math.rnde(enemies)
}
