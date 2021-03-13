// @depends(dna/hud/Panel)

const df = {
    name: 'titleBar',
}

class TitleBar extends dna.hud.Panel {

    constructor(st) {
        super( augment({}, df, st) )
    }

    adjust() {}

    show() {
        this.hidden = false
        lab.world.show()
    }

    hide() {
        this.hidden = true
        if (lab.world) lab.world.hide()
    }

    drawTeamStat(team, tstat, x, y, w) {
        let line
        if (w < 10) {
            line = team.name.toUpperCase().substring(0, 1) + ':' + tstat.units
        } else {
            line = team.name.toUpperCase() + ':' + tstat.units
        }
        this.__
            .face( team.color() )
            .at(x, y)
            .print(line)
    }

    draw() {
        const world = this.world
        const hero = world.hero
        const tx = this.__
        const w = tx.tw

        // fill the top bar
        tx
            .reset()
            .at(0, 0)
            .back(lib.cidx('baseLow'))
            .face(lib.cidx('alert'))

        for (let x = 0; x < w; x++) {
            tx.out(' ')
        }

        const stat = lab.control.stat.teamStat()
        if (this.title) {
            tx
                .face(lib.cidx('alert'))
                .at(0, 0)
                .print(this.title)
        } else if (stat) {
            const teamW = floor((w - 10)/5)

            let x = 0
            const y = 0
            for (let i = 1; i < env.team.length; i++) {
                this.drawTeamStat(env.team[i], stat[i], x, y, teamW)
                x += teamW
            }
            this.drawTeamStat(env.team[0], stat[0], x, y, teamW)
        }

        let turn = 'Turn:' + world.turn
        if (world.scheduled) turn += '<' + world.scheduled
        tx
            .face(lib.cidx('alert'))
            .at(w - 10, 0).print(turn)

        /*
        tx.at(1, 0).print('' + this.world.hero.x + ':'
                        + this.world.hero.y + '     ')
        */
    }
}
