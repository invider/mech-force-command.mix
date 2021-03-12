const alias = 'control'

function onInstall() {
    if (!this.__.move) throw `move pod must be present to control ${this.__.name}`
}

function take() {
    const droid = this.__
    droid.taken = true
    droid.origSymbol = droid.symbol
    droid.symbol = '@'
}

function act(action) {
    const bot = this.__
    if (bot.dead) return

    if (action < 4) {
        bot.move.dir(action)
        lib.sfx('step')

        // try to fire
        const foe = bot.scanner.scanForEnemy()
        if (foe) {
            // watttack!!!
            bot.status = 'attacking [' + foe.team + '/' + foe.name + ']'
            //log(`[${this.name}] ${this.status}`)
            bot.gun.shot(foe)
        }

        return true
    }

    switch(action) {
        case $.USE:
            const foe = bot.scanner.scanForEnemy()
            if (foe) {
                // watttack!!!
                bot.status = 'attacking [' + foe.team + '/' + foe.name + ']'
                //log(`[${this.name}] ${this.status}`)
                bot.gun.shot(foe)
            }
            //sfx('move', .4)
            //hero.pack.selectNext()
            break
    }
}

function release() {
    this.__.symbol = this.__.origSymbol
    this.__.taken = false
}

function onRemove() {}
