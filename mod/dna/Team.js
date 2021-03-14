
const MAX_MARKERS = 9

class Team {

    constructor() {
        this.id = job.serial('team') - 1
        this.name = env.tune.teams[this.id]
        this.mechSerial = 0
        this.marker = 0
    }

    nextSerial() {
        return ++this.mechSerial
    }

    nextMarker() {
        this.marker ++
        if (this.marker > MAX_MARKERS) this.marker = 1
        return this.marker
    }

    unitsAlive() {
        let units = 0
        const ls = lab.world.mob._ls
        for (let i = 0; i < ls.length; i++) {
            const e = ls[i]
            if (e && !e.dead && e.team === this.id) units ++
        }
        return units
    }

    color() {
        return pal.team[this.id].color
    }
}
