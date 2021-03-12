let id = 0

class Team {

    constructor() {
        this.name = env.tune.teams[id]
        this.id = id ++
        this.droidSerial = 0
    }

    focusOn(droid) {
        this.focus = droid
    }

    // try to bind controls to the leader
    capture() {
        if (!this.leader) return false
        this.leader.takeControl()
    }

    nextLeader() {
        const team = this.id
        const ls = lab.world.mob._ls

        const next = lib.array.next(ls, this.leader,
                (e) => (!e.dead && e.team === team))
        if (next) {
            log(`jumping to ${next.title}`)
            this.leader = next
        }
    }

    prevLeader() {
        const team = this.id
        const ls = lab.world.mob._ls

        const prev = lib.array.prev(ls, this.leader,
                (e) => (!e.dead && e.team === team))
        if (prev) {
            log(`jumping to ${prev.title}`)
            this.leader = prev
        }
    }

    openMenu() {
        const port = lab.mode['port' + this.id]
        if (port) port.openMenu()
    }

    nextSerial() {
        return ++this.droidSerial
    }
}
