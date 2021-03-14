const alias = 'control'

function onInstall() {
    if (!this.__.move) throw `move pod must be present to control ${this.__.name}`
}

function take() {
    const mech = this.__
    mech.taken = true
    mech.origSymbol = mech.symbol
    mech.symbol = '@'
}

function act(action) {
    const mech = this.__
    if (mech.dead) return

    if (action < 4) {
        mech.move.dir(action)
        //lib.sfx('step')

        /*
        // try to fire
        const foe = mech.scanner.scanForEnemy()
        if (foe) {
            // watttack!!!
            mech.status = 'attacking [' + foe.team + '/' + foe.name + ']'
            //log(`[${this.name}] ${this.status}`)
            mech.gun.shot(foe)
        }
        */

        return true
    }

    switch(action) {
        case $.USE:
            const foe = mech.scanner.scanForEnemy()
            if (foe) {
                // watttack!!!
                mech.status = 'attacking [' + foe.team + '/' + foe.name + ']'
                //log(`[${this.name}] ${this.status}`)
                mech.gun.shot(foe)
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
