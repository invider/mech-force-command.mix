const df = {
    id: 1,
    team: 0,
    x: 0,
    y: 0,
    symbol: 1,
}

class Marker {

    constructor(st) {
        augment(this, df, st)
        this.symbol = '' + this.id
        this.name = 'marker' + this.team + '-' + this.id
        this.title = 'marker ' + this.id
    }

    color() {
        const team = this.team || 0
        if (team) return pal.team[team].color
    }
}
