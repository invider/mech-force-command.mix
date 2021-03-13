const dt = {
    symbol: 'P',
    status: '',
    solid: true,
    transparent: false,
    x: 0,
    y: 0,
}

class Platform {

    constructor(st) {
        this.pod = []
        augment(this, dt)
        augment(this, st)

        if (this.install) {
            for (let pod of this.install) {
                this.attach(pod)
            }
        }
    }

    init() {}

    attach(src, st) {
        if (!src) throw 'no source object to attach!'

        let pod

        if (isFun(src)) {
            if (/[A-Z]/.test(src.name[0])) {
                // upper-case means constructor
                pod = new src(st)
                if (!pod.name) {
                    pod.name = src.name[0].toLowerCase()
                        + src.name.substring(1)
                }
            } else {
                // just a function pod - attach as is
                pod = src
            }
        } else {
            // extend from a pod object
            pod = {}
            augment(pod, src) 
            augment(pod, st)
        }

        this.pod.push(pod)
        if (pod.alias) this[pod.alias] = pod
        else if (pod.name) this[pod.name] = pod
        pod.__ = this

        if (pod.onInstall) pod.onInstall()
    }

    detach(pod) {
        if (!pod) return
        const i = this.pod.indexOf(pod)

        if (i >= 0) {
            if (pod.onRemove) pod.onRemove()
            if (pod.alias) delete this[pod.alias]
            else if (pod.name) delete this[pod.name]
            this.pod.splice(i, 1)
        }
    }

    next() {
        if (this.behave) this.behave()
        for (let i = 0; i < this.pod.length; i++) {
            const pod = this.pod[i]
            if (pod.next) pod.next(dt)
        }
    }

    color() {
        const team = this.team || 0
        return pal.team[team].color
    }

    evo(dt) {
        for (let i = 0; i < this.pod.length; i++) {
            const pod = this.pod[i]
            if (pod.evo) pod.evo(dt)
        }
    }

    getStatus() {
        const title = this.title || this.name
        if (this.status) return title + ' - ' + this.status
        else return title
    }

    kill() {
        const platform = this

        defer(() => {
            platform.dead = true
            //log(`${platform.name} has died!`)
            platform.__.detach(platform)
        })
    }
}
