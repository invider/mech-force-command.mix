
const LEVELS = 4

class Intent {

    constructor(st) {
        this.name = 'intent'
        this.map = []
        augment(this, st)

        this.ln = this.w * this.h
        this.clear()
    }
    
    get(l, x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return 0
        return this.map[ l * this.ln + (y*this.w + x) ]
    }

    getMin(intent, l, x, y) {
        const v = intent.get(l, x, y)
        if (!v || v <= 0) return 999
        return v
    }

    getMax(intent, l, x, y) {
        const v = intent.get(l, x, y)
        if (!v || v <= 0) return 0
        return v
    }

    dir(l, x, y, max) {
        const w = []
        const fn = max? this.getMax : this.getMin
        w[0] = fn(this, l, x, y)
        w[1] = fn(this, l, x, y - 1)
        w[2] = fn(this, l, x - 1, y)
        w[3] = fn(this, l, x, y + 1)
        w[4] = fn(this, l, x + 1, y)

        const v = lib.math.shuffle([1, 2, 3, 4])

        function isFit(j) {
            let val = w[j]
            let fit = val

            for (let i = 0; i < 5; i++) {
                if (max) {
                    if (w[i] > fit) fit = w[i]
                } else {
                    if (w[i] < fit) fit = w[i]
                }
            }

            if (max) return (val >= fit)
            else return (val <= fit)
        }

        for (let i = 0; i < 4; i++) {
            const j = v[i]
            if (isFit(j)) return (j - 1)
        }
        return -1
    }

    set(l, x, y, val) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return
        this.map[ l * this.ln + (y*this.w + x) ] = val
    }

    recalc(level) {
        const intent = this
        const world = this.__
        const hero = world.hero

        function touch(l, x, y, step, from) {
            const i = intent.get(l, x, y)
            if (i !== 0) {
                if (from) {
                    if (i > 0 && step < i) {
                        intent.set(l, x, y, step)
                        return true
                    }
                } else {
                    if (i > 0 && step > i) {
                        intent.set(l, x, y, step)
                        return true
                    }
                }
                return false
            } else {
                return true
            }
        }

        function trace(l, x, y, step, max) {
            if (!step) step = 0

            if (world.isWalkable(x, y)) {
                intent.set(l, x, y, step)
            } else {
                intent.set(l, x, y, -1)
                return
            }

            if (max) {
                step ++
                if (step > max) return
            } else {
                step --
                if (step <= 0) return
            }

            const up    = touch(l, x,   y-1, step, max)
            const left  = touch(l, x-1, y,   step, max)
            const down  = touch(l, x,   y+1, step, max)
            const right = touch(l, x+1, y,   step, max)

            if (up)    trace(l, x,   y-1, step, max)
            if (left)  trace(l, x-1, y,   step, max)
            if (down)  trace(l, x,   y+1, step, max)
            if (right) trace(l, x+1, y,   step, max)
        }

        switch(level) {
            case 0:
                this.clear(0)
                trace(0, hero.x, hero.y, 0, env.tune.followingRadius)
                //trace(0, hero.x, hero.y, 5)
                break

            case 1:
                this.clear(1)
                world.prop._ls.forEach(prop => {
                    if (prop && !prop.dead && prop.symbol === 'X') {
                        trace(1, prop.x, prop.y, 0, env.tune.altarRadius)
                    }
                })
                break

            default:
                this.recalc(0)
                this.recalc(1)
        }
    }

    clear(level) {
        const start = level * this.ln
        const n = this.ln

        for (let i = start; i < start + n; i++) {
            this.map[i] = 0
        }
    }

    clearAll() {
        const n = this.ln * LEVELS

        for (let i = 0; i < n; i++) {
            this.map[i] = 0
        }
    }
}
