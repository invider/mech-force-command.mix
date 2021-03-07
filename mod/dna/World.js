const df = {
    name: 'world',
    turn: 0,
    timer: 0,
    scheduled: 0,
    autoevolve: false,
}

class World extends sys.Frame {

    constructor(st) {
        super()
        this.attach(new sys.Frame({
            name: 'mob',
        }))
        this.attach(new sys.Frame({
            name: 'prop',
        }))
        this.attach(new sys.Frame({
            name: 'ghost',
        }))
        //this.mob = []
        //this.prop = []

        this.segment = new dna.Segment({
            x: 0,
            y: 0,
        })

        augment(this, df)
        augment(this, st)
    }

    place(segment, quad, target) {
        if (!target) target = this.segment
        if (quad) lib.segment.positionSegment(segment, quad, target)
        return this.segment.attach(segment)
    }

    spawn(dna, st) {
        const e = isObj(dna)? dna : new dna(st)

        if (e.next) this.mob.attach(e)
        else this.prop.attach(e)
        e._ = this

        if (e.init) e.init()
        return e
    }

    getMob(x, y) {
        for (let i = 0; i < this.mob._ls.length; i++) {
            const mob = this.mob._ls[i]
            if (mob.x === x
                && mob.y === y
                && !mob.dead) return mob
        }
    }

    getProp(x, y) {
        for (let i = 0; i < this.prop._ls.length; i++) {
            const prop = this.prop._ls[i]
            if (prop.x === x
                && prop.y === y
                && !prop.dead) return prop
        }
    }

    getEntity(x, y) {
        const mob = this.getMob(x, y)
        if (mob) return mob
        const prop = this.getProp(x, y)
        if (prop) return prop
    }

    get(x, y) {
        const e = this.getEntity(x, y)
        if (e) return e.symbol

        const source = this.infected.getInfected(x, y)
        if (source === 2) return env.style.infectionSource
        if (source === -1) return env.style.guard

        return this.segment.get(x, y)
    }

    getLand(x, y) {
        return this.segment.get(x, y)
    }

    set(x, y, l) {
        this.segment.set(x, y, l)
        return this
    }

    touch(x, y, mob) {
        if(!mob) return

        if (mob.land) {
            const land = this.getLand(x, y)
            mob.land(land)
        }

        const target = this.getEntity(x, y)
        if (target) {
            if (mob.touch) mob.touch(target)
            if (target.touchedBy) target.touchedBy(mob)
        }

        if (mob.infect && this.infected.isInfected(x, y)) {
            mob.infect()
        }
    }

    isExplored(x, y) {
        const explored = this.segment.isExplored(x, y)
        if (explored === undefined) return true
        return explored
    }

    explore(x, y) {
        this.segment.explore(x, y)
    }

    exploreFOV(fov) {
        for (let ly = 0; ly < fov.h; ly++) {
            for (let lx = 0; lx < fov.w; lx++) {
                if (fov.map[ly * fov.w + lx]) {
                    this.explore(lx - fov.dx, ly - fov.dy)
                }
            }
        }
    }

    isSolid(x, y) {
        const mob = this.getMob(x, y)
        if (mob && mob.solid) return mob

        const prop = this.getProp(x, y)
        if (prop && prop.solid) return prop

        const land = this.segment.get(x, y)
        if (!land) return env.tune.solidAether
        return env.tune.solid.includes(land)
    }

    isWalkable(x, y) {
        const land = this.segment.get(x, y)
        if (!land) return !env.tune.solidAether
        return !env.tune.solid.includes(land)
    }

    transparent(x, y) {
        const land = this.segment.get(x, y)
        if (!land) return true
        if (env.tune.opaque.includes(land)) return false
        return true
    }

    landArea() {
        let area = 0
        for (let y = 0; y < this.segment.h; y++) {
            for (let x = 0; x < this.segment.w; x++) {
                const land = this.getLand(x, y)
                if (land && land !== '~' && land !== '^') area ++
            }
        }
        return area
    }

    calculateInfectedArea() {
        const total = this.landArea()
        const infected = round((this.infected.cells / total) * 100)
        env.status.infected = infected
    }

    evo(dt) {
        if (this.paused) return

        if (this.scheduled > 0) {
            this.timer -= dt
            if (this.timer <= 0) {
                this.scheduled --
                if (this.scheduled === 0) this.timer = 0
                else {
                    if (this.fast) this.timer = env.tune.fastTime
                    else this.timer = env.tune.turnDelay
                }
                this.next()
            }
        } else if (this.autoevolve) {
            this.timer -= dt
            if (this.timer <= 0) {
                this.next()

                if (this.fast) this.timer = env.tune.fastTime
                else this.timer = env.tune.turnTime
            }
        }
    }

    next() {
        this.turn ++
        for (let i = 0; i < this.mob._ls.length; i++) {
            const mob = this.mob._ls[i]
            if (mob && !mob.dead) {
                mob.next()
            }
        }

        for (let i = 0; i < this.ghost._ls.length; i++) {
            const ghost = this.ghost._ls[i]
            if (ghost && !ghost.dead) {
                ghost.next()
            }
        }

        this.onMovement()
        this.calculateInfectedArea()
    }

    onMovement() {
        this.intent.recalc(0)
    }

    scheduleNext() {
        if (this.scheduled === 0) {
            this.timer = env.tune.turnDelay
        }
        this.scheduled ++
    }
}
