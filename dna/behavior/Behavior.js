class Behavior {

    constructor(st) {
        augment(this, st)
    }

    activate() {
        const mob = this.__
        // the behave() function must have a type
        this.behave.type = this.name
        mob.behave = this.behave
        mob.behavior = this
    }

    onInstall() {
        // at least move should be present
        if (!this.__.move) throw `move pod should be present in ${this.__.name}`
        this.activate()
    }

    randomStep() {
        this.__.move.dir(RND(3))
        this.__.status = 'walking around'
    }

    behave() {}

    onDeinstall() {
        const mob = this.__
        if (mob.behave === this.behave) {
            mob.behave = false 
        }
    }
}
