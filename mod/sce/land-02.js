const name = 'Death Valley'

const opt = {
    w: 96,
    h: 96,
    base: '.',
}

function genTerrain(world) {
    lib.ken.generateIsland(world, {
        width: opt.w,
        height: opt.h,

        dx: opt.seed * 827,
        dy: opt.seed * 175,
        z: .5,

        scale: 15,
        level: {
            water: .15,
            sand:  .14,
            ice:   .18,
            stone: .42,
            mech:  .73,
        },
        world: world,
    })
}
