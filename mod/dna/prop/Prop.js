const df = {
    team: 0,
    x: 0,
    y: 0,
}

class Prop {

    constructor(st) {
        augment(this, df, st)
    }

    color() {
        const team = this.team || 0
        if (team) return pal.team[team].color
    }
}
