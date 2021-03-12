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
    }
}
