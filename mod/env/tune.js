const tune = {
    app: 'mech-force-command',
    maxLevel: 7,

    zoomStep:   0.2,
    minZoom: 0.5,
    maxZoom: 5,

    turnDelay:  .5,
    turnTime:   .5,
    fastTime:   .015,
    keyRepeat:  .3,
    fogOfWar: false,
    hideUnexplored: false,
    defaultFoV: 21,

    followingRadius: 15,
    altarRadius: 30,
    altarMinimum: 1,
    solidAether:    true,

    defaultSegmentWidth:    128,
    defaultSegmentHeight:   128,
    solid:  ['~', '^', '#', '|', '-'],
    opaque: ['#'],
    resistant: ['~', '^', '#'],
    destructable: ['^', '#'],
    destructionFactor: .05,
    guardSteps: 16,
    guardFactor: .3, // chance of containment for a single turn

    infection: {
        minLife: 11,
        maxLife: 27, 
    },

    // how much rabbit have to eat
    // before it's ready to procreate
    rabbitProcreateFood: 9,

    healthForFood: 25,
    spoiledFoodPenalty: 15,
    infectedStonePenalty: 5,
}
