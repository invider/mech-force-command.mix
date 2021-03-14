const name = 'Wastelands'

const opt = {
    w: 128,
    h: 128,
    base: ' ',
}

function genTerrain(world) {
    lib.ken.generateIsland(world, {
        width: opt.w,
        height: opt.h,

        dx: opt.seed * 745,
        dy: opt.seed * 3871,
        z: .7,

        scale: 15,
        level: {
            water: .11,
            sand:  .16,
            ice:   .18,
            stone: .37,
            mech:  .73,
        },
        world: world,
    })
}
