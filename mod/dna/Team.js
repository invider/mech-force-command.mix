
const MAX_MARKERS = 9

class Team {

    constructor() {
        this.id = job.serial('team')
        this.name = env.tune.teams[this.id - 1]
        this.droidSerial = 0
        this.marker = 0
    }

    /*
    focusOn(droid) {
        this.focus = droid
    }

    // try to bind controls to the leader
    capture() {
        if (!this.leader) return false
        this.leader.takeControl()
    }
    */

    nextSerial() {
        return ++this.droidSerial
    }

    nextMarker() {
        this.marker ++
        if (this.marker > MAX_MARKERS) this.marker = 1
        return this.marker
    }
}
