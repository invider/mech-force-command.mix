class Infected {

    constructor(st) {
        this.name = 'infected'
        this.map = []
        this.sources = []
        this.guards = []
        this.cells = 0
        augment(this, st)
    }

    isDestructable(x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return false
        const land = this.world.get(x, y)
        return env.tune.destructable.includes(land)
    }

    isInfectable(x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return false

        const land = this.world.get(x, y)

        return !env.tune.resistant.includes(land)
        //return (land !== '~' && land !== '^' && land !== '#')
    }

    isInfected(x, y) {
        return (this.map[y*this.w + x] > 0)
    }

    getInfected(x, y) {
        const i = this.map[y*this.w + x]
        if (!i) return 0
        else return i
    }

    infect(x, y, type) {
        if (this.isDestructable(x, y)
                && rnd() < env.tune.destructionFactor) {
            this.world.set(x, y, '.')
            this.map[y*this.w + x] = type || 1
            this.cells ++
            return true
        }
        if (!this.isInfectable(x, y)) return false

        const prev = this.map[y*this.w + x]
        if (!prev || prev <= 0) this.cells ++
        this.map[y*this.w + x] = type || 1
        return true
    }

    cure(x, y, type) {
        if (this.getInfected(x, y) === 1) {
            this.cells --
            this.map[y*this.w + x] = type || 0
            return true
        } else if (type < 0) {
            this.map[y*this.w + x] = type
        }
    }

    source(x, y) {
        if (this.infect(x, y, 2)) {
            const n = env.tune.infection.minLife
                    + RND(env.tune.infection.maxLife
                        - env.tune.infection.minLife)
            this.sources.push({ x:x, y:y, n:n })
        }
    }

    killSource(src) {
        const i = this.sources.indexOf(src)
        if (i >= 0) {
            this.infect(src.x, src.y, 1)
            this.sources.splice(i, 1)
        }
    }

    spread(x, y, t, i) {
        if (this.getInfected(x, y) === 0) {
            const infected = this.infect(x, y)

            if (t === 2 && infected) {
                this.source(x, y)
            }
            return infected

        } else {
            if (!i) i = 0
            else if (i > 1024) return false

            switch(RND(7)) {
            case 0: return this.spread(x - 1, y - 1, t, i+1)
            case 1: return this.spread(x + 1, y - 1, t, i+1)
            case 2: return this.spread(x,     y - 1, t, i+1)
            case 3: return this.spread(x - 1, y, t,     i+1)
            case 4: return this.spread(x + 1, y, t,     i+1)
            case 5: return this.spread(x - 1, y + 1, t, i+1)
            case 6: return this.spread(x,     y + 1, t, i+1)
            case 7: return this.spread(x + 1, y + 1, t, i+1)
            }
        }
    }

    jump(x, y, leap, steps) {
        if (steps > 0) {
            steps --

            const targets = [
                { x: x, y: y - leap },
                { x: x - leap, y: y },
                { x: x, y: y + leap },
                { x: x + leap, y: y },
            ]
            lib.math.shuffle(targets)

            for (let i = 0; i < targets.length; i++) {
                const t = targets[i]
                if (this.isInfectable(t.x, t.y)) {
                    return this.jump(t.x, t.y, leap, steps)
                }
            }
            return false

        } else {
            if (this.infect(x, y, 2)) {
                const n = env.tune.infection.minLife
                        + RND(env.tune.infection.maxLife
                            - env.tune.infection.minLife)
                this.sources.push({ x:x, y:y, n:n })
                return {
                    x: x,
                    y: y,
                }

            } else {
                return false
            }
        }
    }

    contain(x, y, i) {
        if (this.getInfected(x, y) > 0) {
            this.cure(x, y)
            return true

        } else {
            if (!i) i = 0
            else if (i > env.tune.guardSteps) return false

            switch(RND(3)) {
                case 0: return this.contain(x,     y - 1, i+1)
                case 1: return this.contain(x - 1, y,     i+1)
                case 2: return this.contain(x,     y + 1, i+1)
                case 3: return this.contain(x + 1, y,     i+1)
            }
        }
    }

    guard(x, y) {
        this.cure(x, y, -1)
        this.guards.push({ x:x, y:y })
    }

    evoSources() {
        for (let i = 0; i < this.sources.length; i++) {
            const src = this.sources[i]
            this.spread(src.x, src.y, 1)
            src.n --

            if (src.n <= 0) {
                const spread = this.spread(src.x, src.y, 2)
                if (spread) this.killSource(src)
            }
        }
    }

    evoGuards() {
        for (let i = 0; i < this.guards.length; i++) {
            const guard = this.guards[i]
            if (rnd() < env.tune.guardFactor) {
                this.contain(guard.x, guard.y)
            }
        }
    }

    next() {
        this.evoSources()
        this.evoGuards()
    }
}
