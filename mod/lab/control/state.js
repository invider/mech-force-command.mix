const df = {
    fadein:  1,
    keep:   .5, 
    fadeout: 1,
}

function init(st) {
    augment(this, df, st)
    this.ls = []
    this.dir = {}
}

function defineScreen(name, nodes, opt) {
    if (!isString(name)) throw 'no screen name is specified!'
    if (!isArray(nodes)) {
        // wrap the node into an array
        nodes = [ nodes ]
    }

    const screen = this.dir[name]
    if (screen) {
        augment(screen, opt)
        for (const node of nodes) {
            screen.nodes.push(node)
        }
        return screen

    } else {
        const newScreen = { name, nodes }
        augment(newScreen, opt)

        this.ls.push(newScreen)
        this.dir[name] = newScreen
        return newScreen
    }
}

function define(name, nodes, opt) {
    const screen = this.defineScreen(name, nodes, opt)
    this.hide(screen.name)
    return this
}

function hideScreen(screen) {
    if (!screen) return
    for (const node of screen.nodes) {
        if (isFun(node.pause)) node.pause()
        else node.paused = true
        if (isFun(node.hide)) node.hide()
        else node.hidden = true
        if (isFun(node.onHide)) node.onHide()
    }
    return screen
}

function showScreen(screen) {
    if (!screen) return
    this.active = screen
    for (const node of screen.nodes) {
        if (isFun(node.resume)) node.resume()
        else node.paused = false
        if (isFun(node.show)) node.show()
        else node.hidden = false
        if (isFun(node.onShow)) node.onShow()
    }
    return this
}

function hide(name) {
    const screen = this.dir[name]
    this.hideScreen(screen)
    return this
}

function hideAll() {
    for (const screen of this.ls) {
        this.hide(screen.name)
    }
    return this
}

function show(name) {
    const screen = this.dir[name]
    if (!screen) {
        log.error(`missing screen [${name}]!`)
        return this
    }
    this.hideAll()
    this.showScreen(screen)
    return this
}

function fadeTo(name, opt) {
    const screen = this.dir[name]
    if (!screen) {
        log.err(`missing screen [${name}]!`)
        return this
    }

    const fadein = (opt && opt.fadein !== undefined)? opt.fadein : this.fadein
    const keep = (opt && opt.keep !== undefined)? opt.keep : this.keep
    const fadeout = (opt && opt.keep !== undefined)? opt.fadeout : this.fadeout

    const control = this
    lab.spawn(dna.hud.Transition, {
        fadein:  fadein,
        keep:    keep,
        fadeout: fadeout,

        onKeep: function() {
            control.hideAll()
            if (opt && opt.onHide) opt.onHide()
        },
        onFadeout: function() {
            control.showScreen(screen)
            if (opt && opt.onShow) opt.onShow()
        },
    })
    return this
}

function dump() {
    if (this.active) log.raw('active: ' + this.active.name + ' screen')
    else log.raw('no active screen')
    for (screen of this.ls) {
        let def = screen.name + ' screen'
        def += ': [' + screen.nodes.map(n => n.name).join(', ') + ']'
        log.raw(def)
    }
}
