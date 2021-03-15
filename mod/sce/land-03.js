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

    world.spawn( dna.prop.Factory, { x: 52, y: 46 })
    world.spawn( dna.prop.Factory, { x: 71, y: 47 })
    world.spawn( dna.prop.Factory, { x: 53, y: 77 })
    world.spawn( dna.prop.Factory, { x: 84, y: 75 })

    world.spawn( dna.prop.Factory, { x: 67, y: 78 })
    world.spawn( dna.prop.Factory, { x: 60, y: 37 })
}
