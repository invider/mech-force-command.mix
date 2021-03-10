const alias = 'control'

function onInstall() {
    if (!this.__.move) throw `move pod must be present to control ${this.__.name}`
}

function act(action) {
    const bot = this.__

    if (action < 4) {
        bot.move.dir(action)
        sfx('step', .5)

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
        case 4:
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
        case 5:
            //sfx('move', .4)
            //hero.pack.selectPrev()
            break
        case 6:
            //hero.pack.use()
            break
    }
}

function onDeinstall() {}
