// @depends(dna/hud/Panel)

class TopPanel extends dna.hud.Panel {

    constructor(st) {
        super(st)
        this.name = 'topPanel'
    }

    adjust() {}

    draw() {
        const world = this.world
        const hero = world.hero
        const tx = this.__
        const w = tx.tw

        // fill the top bar
        tx
            .reset()
            .at(0, 0)
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))

        for (let x = 0; x < w; x++) {
            tx.out(' ')
        }

        let turn = 'Turn:' + world.turn
        if (world.scheduled) turn += '<' + world.scheduled
        tx.at(w - 14, 0).print(turn)
        
        /*
        tx.at(1, 0).print('' + this.world.hero.x + ':'
                        + this.world.hero.y + '     ')

        tx.at(w - 11, 0).print('health:' + hero.health)
        tx.at(w - 22, 0).print('stones:' + hero.stones)
        tx.at(w - 32, 0).print('food:' + hero.food)
        */

        let followers = 0
        let islanders = 0
        let rabbits = 0
        for (let i = 0; i < this.world.mob._ls.length; i++) {
            const mob = this.world.mob._ls[i]
            if (!mob.dead) {
                if (mob instanceof dna.bad.Islander) {
                    islanders ++
                    if (mob.follower) followers ++
                }
                if (mob instanceof dna.bad.Rabbit) {
                    rabbits ++
                }
            }
        }
        /*
        tx.at(w - 40, 0).print('p:' + islanders
            + '/' + rabbits)
        */

        env.status.population = islanders
        env.status.followers = followers
        env.status.rabbits = rabbits

        tx.at(1, 0).print('Infected:' + env.status.infected + '%')
    }
}
