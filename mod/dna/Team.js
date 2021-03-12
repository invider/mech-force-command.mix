let id = 0

class Team {

    constructor() {
        this.name = env.tune.teams[id]
        this.id = id ++
        this.droidSerial = 0
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
}
