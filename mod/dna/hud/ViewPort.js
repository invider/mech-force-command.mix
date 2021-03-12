const df = {
    name: 'viewPort',
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    targetEdge: 5,
}

let id = 0
class ViewPort {

    constructor(st) {
        augment(this, df, st)
        this.id = ++id
        this.name = 'port' + this.id
        if (!this.port) this.port = {
            x: 0,
            y: 0,
        }
        if (!this.target) this.target = {
            team: -1,
        }
    }

    init() {
        this.adjust()
        this.menu = this.__.spawn(dna.hud.Menu, {
            Z: this.Z + 20,
            name: 'portMenu' + this.id,
            port: this,
            hidden: true,
            itemStep: 1,
        })
    }

    adjust() {
        const tx = this.__

        let x = 0
        let y = 2
        let w = tx.tw
        let h = tx.th - 4

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
                y = floor(h/2 + 3)
                h = h - y + 3
                break
            case 'bottom-right':
                x = floor(w/2 + 1)
                y = floor(h/2 + 3)
                w = w - x
                h = h - y + 3
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

    bx() {
        return this.port.x - floor(this.w/2)
    }

    by() {
        return this.port.y - floor(this.h/2)
    }

    cx() {
        return this.port.x
        //return floor(this.port.x + this.w/2)
    }

    cy() {
        return this.port.y
        //return floor(this.port.y + this.h/2)
    }

    lookAt(x, y) {
        this.port.x = x
        this.port.y = y
    }

    focusOn(platform) {
        if (this.target.focus) {
            this.releaseControl(this.target.focus)
        }
        this.target.focus = platform
    }

    releaseFocus() {
        this.releaseControl()
        this.target.focus = null
    }

    takeControl(platform) {
        platform = platform || this.target.focus
        if (!platform || platform.dead) return

        this.focusOn(platform) // need to follow it first
        if (this.hidden || this.disabled || this.locked) return

        if (this.target.team >= -1 && this.target.team !== platform.team) {
            //log(`[${this.name}] can't capture [${platform.title}]`)
            return
        }
        log('taking control of [' + platform.name + ']')
        this.target.taken = true
        platform.control.take()
    }

    releaseControl() {
        if (!this.target.focus
            || !this.target.taken) return
        this.target.taken = false
        this.target.focus.control.release()
    }

    inView(x, y) {
        const bx = this.bx()
        const by = this.by()
        return (x >= bx && x < bx + this.w
                && y >= by && y < by + this.h)
    }

    distToCenter(x, y) {
        return dist(x, y, this.cx(), this.cy())
    }

    printEntity(e) {
        const lx = e.x - this.bx()
        const ly = e.y - this.by()

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
                const gx = this.bx() + x
                const gy = this.by() + y
                const vx = this.x + x
                const vy = this.y + y

                // determine visibility state
                const explored = !env.tune.hideUnexplored
                            || this.world.isExplored(gx, gy)
                const visible = fov.test(gx, gy)

                if (explored) {

                    let e
                    let eBackColor
                    let s
                    if (visible) {
                        e = this.world.getEntity(gx, gy)
                        if (e) {
                            s = e.symbol
                            eBackColor = e.bcolor
                        } else {
                            s = this.world.get(gx, gy)
                            eBackColor = this.world.getf(gx, gy)
                        }
                    } else {
                        s = this.world.getLand(gx, gy)
                    }
                    if (!s) s = env.tune.aether

                    // set background color
                    this.tx.put(vx, vy, 0, this.tx.BACK)
                    if (eBackColor) this.tx.put(vx, vy, eBackColor, this.tx.CBACK)

                    // select color
                    let c = cidx('land')
                    if (visible) {
                        if (e) {
                            if (e.color) {
                                c = e.color()
                            }
                        } else {
                            switch (s) {
                                case '~': c = cidx('water'); break;
                                case '_': c = cidx('sand'); break;
                                case '^': c = cidx('ice'); break;
                                case '"': c = cidx('forest'); break;
                            }
                        }
                    } else {
                        c = cidx('shaddow')
                    }
                    this.tx.put(vx, vy, c, this.tx.FACE)

                    this.tx.put(vx, vy, s)

                } else {
                    this.tx.put(vx, vy, cidx('shaddow'), this.tx.FACE)
                    this.tx.put(vx, vy, env.tune.unexplored)
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

        this.port.x = target.x
        this.port.y = target.y
        //this.port.x = round(target.x - this.w/2)
        //this.port.y = round(target.y - this.h/2)
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

    act(action, repeat, pressTime) {
        //log(`[${this.name}] #${action}`)
        if (action === _.NEXT) {
            this.jump(1)
            return
        } else if (action === _.PREV) {
            if (this.target.focus && repeat >= env.tune.portReleaseRepeats) {
                this.releaseFocus()
                lib.sfx('free')
            } else {
                if (this.target.focus) {
                    this.jump(-1)
                }
            }
            return
        } else if (action === _.OPT) {
            this.openMenu()
            return
        }

        if (this.target.focus) {
            if (this.target.focus.dead) {
                // focus droid has been destroyed
                this.releaseControl()
                if (this.target.taken) {
                    const port = this
                    setTimeout(() =>  {
                        port.jump(1)
                    }, 100)
                } else {
                    this.target.focus = null
                }
            }
            if (this.target.taken) {
                // controlling the platform
                this.target.focus.control.act(action)
            } else {
                // try take the control
                this.takeControl()
            }

        } else {
            // free
            const s = env.tune.reverseFreeControl? -1 : 1
            switch(action) {
                case 0:
                    this.port.y += s * ceil(this.h * env.tune.freeStep)
                    break
                case 1:
                    this.port.x += s * ceil(this.w * env.tune.freeStep)
                    break
                case 2:
                    this.port.y -= s * ceil(this.h * env.tune.freeStep)
                    break
                case 3:
                    this.port.x -= s * ceil(this.w * env.tune.freeStep)
                    break
            }
        }
    }

    /*
    deactivate(action, pressTime) {
        if (action === _.PREV && pressTime > env.tune.portReleaseDelay) {
            this.releaseFocus()
        }
    }
    */

    capture(player) {
        if (this.hidden || this.disabled || this.locked) return
        if (this.id === player + 1) {
            //log(`capturing ${this.name} for player #${player+1}`)
            this.binded = true
            lab.control.player.bind(this, player)
            this.takeControl() // take droid control if focused
        }
    }

    release() {
        lab.control.player.unbind(this)
    }

    draw() {
        //this.bindToTarget()
        this.moveOverTarget(this.target.focus)
        this.print()
    }

    pick(x, y, opt) {
        if (this.hidden) return

        const lx = x - this.x
        const ly = y - this.y
        if (lx < 0 || lx >= this.w
            || ly < 0 || ly >= this.h) return

        const gx = this.port.x + lx
        const gy = this.port.y + ly

        if (opt === 'showLand') {
            const land = this.world.getLand(gx, gy)
            log(`[${land}] at ${gx}:${gy}`)
        } else {
            return this.world.getEntity(gx, gy)
        }
    }

    openMenu() {
        let focusDroid
        if (this.target.focus && this.target.taken) focusDroid = this.target.focus
        const targetDroid = focusDroid
        if (!targetDroid) return

        this.hide()
        this.menu.selectFrom( lib.menu.command.formMenu(focusDroid, targetDroid) )
    }

    jump(n) {
        n = n || 1
        const curDroid = this.target.focus
        const team = this.target.team
        const ls = lab.world.mob._ls

        let next
        const fn = n > 0? lib.array.next : lib.array.prev
        if (team >= 0) {
            next = fn(ls, curDroid,
                    (e) => (e.kind === 'droid' && !e.dead && e.team === team))
        } else {
            next = fn(ls, curDroid,
                    (e) => (e.kind === 'droid' && !e.dead))
        }

        if (next) {
            if (next === curDroid) {
                lib.sfx('idle')
                return
            }
            log(`jumping to ${next.title}`)
            this.takeControl(next)
            if (n > 0) lib.sfx('next')
            else lib.sfx('prev')
        } else {
            this.releaseControl()
        }
    }

    show() {
        this.hidden = false
        // TODO rebind to player if has been binded before
        if (this.binded) this.capture(this.id - 1)
    }

    hide() {
        this.hidden = true
        this.release()
        //if (this.follow && this.follow.releaseControl) this.follow.releaseControl()
        //lib.util.unbindAllPlayers()
    }

    inFocus(platform) {
        if (this.target.focus === platform) return true
        if (!this.next) return false
        return this.next.inFocus(platform)
    }
}
