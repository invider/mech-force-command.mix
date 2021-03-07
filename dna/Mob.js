const dt = {
    symbol: 'M',
    solid: true,
    transparent: false,
    x: 0,
    y: 0,
}

class Mob {

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
            if (pod.onDeinstall) pod.onDeinstall()
            if (pod.alias) delete this[pod.alias]
            else if (pod.name) delete this[pod.name]
            this.pod.splice(i, 1)
        }
    }

    next() {}
}
