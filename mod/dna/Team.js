let id = 0

class Team {

    constructor() {
        this.id = id ++
    }

    setLeader(leader) {
        this.leader = leader
    }

    // try to bind controls to the leader
    capture() {
        if (!this.leader) return false
        this.leader.takeControl()
    }
}
