const alias = 'control'

function onInstall() {
    if (!this.__.move) throw `move pod must be present to control ${this.__.name}`
}

function act(action) {
    const hero = this.__

    if (action < 4) {
        hero.move.dir(action)
        sfx('step', .5)
        return true
    }

    switch(action) {
        case 4:
            sfx('move', .4)
            hero.pack.selectNext()
            break
        case 5:
            sfx('move', .4)
            hero.pack.selectPrev()
            break
        case 6:
            hero.pack.use()
            break
    }
}

function onDeinstall() {}
