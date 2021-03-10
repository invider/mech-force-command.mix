const tune = {
    app: 'mech-force-command',
    maxLevel: 7,
    maxTeams: 4,
    players: 4,
    autoevolve: true,

    zoomStep:   0.2,
    minZoom: 0.5,
    maxZoom: 5,

    minVolume: .1,
    sfxFade:    32,

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

    //aether: ' ',
    aether: '~',
    outside: '~',
    unexplored: '?',

    defaultSegmentWidth:    64,
    defaultSegmentHeight:   64,
    solid:  ['~', '^', '#', '|', '-'],
    opaque: ['#'],
    resistant: ['~', '^', '#'],
    destructable: ['^', '#'],
    destructionFactor: .05,
    guardSteps: 16,
    guardFactor: .3, // chance of containment for a single turn

    testRange: 1000,
}
