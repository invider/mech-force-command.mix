const df = {
    name: 'viewPort',
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    targetEdge: 5,
}

class ViewPort {

    constructor(st) {
        augment(this, df, st)
        this.port = {
            x: 0,
           y: 0,
        }
    }

    init() {
        this.adjust()
    }

    adjust() {
        const tx = this.__

        let x = 0
        let y = 1
        let w = tx.tw
        let h = tx.th - 2

        switch(this.stick) {
            case 'left':
                w = floor(w/2 - 1)
                break
            case 'right':
                x = floor(w/2)
                w = w - x
                break

            case 'top-left':
                w = floor(w/2)
                h = floor(h/2 - 1)
                break
            case 'top-right':
                x = floor(w/2 + 1)
                w = w - x
                h = floor(h/2 - 1)
                break
            case 'bottom-left':
                w = floor(w/2)
                y = floor(h/2 + 1)
                h = h - y + 1
                break
            case 'bottom-right':
                x = floor(w/2 + 1)
                y = floor(h/2 + 1)
                w = w - x
                h = h - y + 1
                break
        }

        /*
        if (tx.titleBar && !tx.titleBar.hidden) {
            y = 1
            h--
        }
        if (tx.statusBar && !tx.statusBar.hidden) {
            h--
        }
        */

        this.x = x
        this.y = y
        this.h = h
        this.w = w
    }

    printEntity(e) {
        const lx = e.x - this.port.x
        const ly = e.y - this.port.y

        if (lx >= 0 && lx < this.w && ly >= 0 && ly < this.h) {
            this.tx.put( this.x + lx, this.y + ly, e.symbol)
        }
    }

    calculateFoV(observer) {
        if (!env.tune.fogOfWar) {
            return {
                test: () => true,
            }
        }

        const world = this.world

        return lib.fov({
                x: observer.x,
                y: observer.y,
                r: observer.fovRadius || env.tune.defaultFoV,
            },
            (lx, ly) => {
                // transparency test for FoV algorithm
                // asked in local observer coordinates
                const gx = observer.x + lx
                const gy = observer.y + ly
                return world.transparent(gx, gy)
            }
        )
    }

    print() {
        if (!this.world) return

        const tx = this.tx
        const cidx = lib.cidx
        const port = this.port
        const fov = this.calculateFoV(this.follow)
        this.world.exploreFOV(fov)

        //tx.reset()

        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const gx = port.x + x
                const gy = port.y + y
                const vx = this.x + x
                const vy = this.y + y

                // determine visibility state
                const explored = !env.tune.hideUnexplored
                            || this.world.isExplored(gx, gy)
                const visible = fov.test(gx, gy)

                const s = visible?
                            this.world.get(gx, gy)
                            : this.world.getLand(gx, gy)

                this.tx.put(vx, vy, 0, this.tx.BACK)

                if (visible) {
                    let c = cidx('land')
                    switch (s) {
                    case '~': c = cidx('water'); break;
                    case '_': c = cidx('sand'); break;
                    case '^': c = cidx('ice'); break;
                    case '"': c = cidx('forest'); break;
                    }

                    this.tx.put(vx, vy, c, this.tx.FACE)

                } else {
                    this.tx.put(vx, vy, cidx('shaddow'), this.tx.FACE)
                }

                if (explored) {
                    if (s) {
                        this.tx.put(vx, vy, s)
                    } else {
                        this.tx.put(vx, vy, env.style.aether)
                    }
                } else {
                    this.tx.put(vx, vy, env.style.unexplored)
                }

                /*
                const intent = this.world.intent.get(0, gx, gy)
                if (intent
                        && s !== '@'
                        && s !== '%'
                        && s !== 'r') {
                    this.tx.put(vx, vy, intent)
                }
                */
            }
        }
    }

    moveOverTarget(target) {
        if (!target) return

        this.port.x = floor(target.x - this.w/2)
        this.port.y = floor(target.y - this.h/2)
        /*
        if (target.x - this.targetEdge < this.port.x) {
            this.port.x = target.x - this.targetEdge
        } else if (target.x + this.targetEdge >=
                    this.port.x + this.w) {
            if (this.w > this.targetEdge * 2) {
                this.port.x = target.x - this.w + this.targetEdge
            }
        }

        if (target.y - this.targetEdge < this.port.y) {
            this.port.y = target.y - this.targetEdge
        } else if (target.y + this.targetEdge >=
                    this.port.y + this.h) {
            if (this.h > this.targetEdge * 2) {
                this.port.y = target.y - this.h + this.targetEdge
            }
        }
        */
    }

    /*
    stat() {
        const tx = this.tx
        tx
            .reset()
            .at(0, 0)
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))

        for (let x = 0; x < this.w; x++) {
            tx.out(' ')
        }

        tx.at(1, 0).print('' + this.world.hero.x + ':'
                        + this.world.hero.y + '     ')
    }
    */

    bindToTarget() {
        if (this.target && this.target.team) {
            // pick the team's leader
            const team = env.team[ this.target.team ]
            if (team && team.leader) {
                this.follow = team.leader
            }
        }
    }

    draw() {
        this.bindToTarget()
        this.moveOverTarget(this.follow)
        this.print()
    }

    pick(x, y) {
        if (this.hidden) return

        const lx = x - this.x
        const ly = y - this.y
        if (lx < 0 || lx >= this.w
            || ly < 0 || ly >= this.h) return

        const gx = this.port.x + lx
        const gy = this.port.y + ly

        return this.world.getEntity(gx, gy)
    }

    show() {
        this.hidden = false
        if (this.follow && this.follow.takeControl) {
            log(`[${this.name}] taking control of [${this.follow.name}]`)
            this.follow.takeControl()
        }
        //lib.util.bindAllPlayers()
    }

    hide() {
        this.hidden = true
        if (this.follow && this.follow.releaseControl) this.follow.releaseControl()
        //lib.util.unbindAllPlayers()
    }
}
