let id = 0

class Team {

    constructor() {
        this.name = env.tune.teams[id]
        this.id = id ++
        this.botSerial = 0
    }

    setLeader(leader) {
        this.leader = leader
    }

    // try to bind controls to the leader
    capture() {
        if (!this.leader) return false
        this.leader.takeControl()
    }

    nextSerial() {
        return ++this.botSerial
    }
}
