const alias = 'gun'

function shot(target) {
    if (!target.hit) throw 'wrong target!'
    target.hit(this.__, 20)
    //if (target.dead) log(`[${this.__.name}] killed [${target.name}]`)
    this.__.lfx.light(.8)
    lib.sfx.at('gunShotsX3', this.__.x, this.__.y)
}
