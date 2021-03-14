const name = 'First Skirmish'

const opt = {
    w: 64,
    h: 64,
    base: '.',
}

function genTerrain(world) {
    lib.ken.generateIsland(world, {
        width: opt.w,
        height: opt.h,

        dx: opt.seed * 227,
        dy: opt.seed * 871,
        z: .2,

        scale: 15,
        level: {
            water: .12,
            sand:  .14,
            ice:   .18,
            stone: .45,
            mech:  .73,
        },
        world: world,
    })
}
