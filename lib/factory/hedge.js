function hedge(world, x, y) {
    world.spawn({
        symbol: 'o',
        x: x,
        y: y,
    })
    world.hero.log('droped a stone')
    sfx.play('selectLow', .8)

    lib.runes.match(world, x, y)
}
