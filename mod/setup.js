function setup() {
    augment(pal, env.palette)

    // set Field of View algorithm
    lib.attach(lib.shaddowFov, 'fov')

    lib.settings.load()
    lib.factory.mode().menu().ui()

    //trap('fadein')
    lab.screenKeeper.hideAll()

    if (!env.config.map) {
        lab.screenKeeper.fadeTo('menu', {
            fadein: 0,
        })

    } else {
        // debug branch - jump straight to the game
        trap('newGame', {
            level: env.config.map,
            fade: {
                fadein:   0,
                keep:     0,
                fadeout: .5,
            },
        })
    }
}
