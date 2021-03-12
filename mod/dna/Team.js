
const MAX_MARKERS = 9

let id = 0
class Team {

    constructor() {
        this.name = env.tune.teams[id]
        this.id = id ++
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
