function setup() {
    augment(pal, env.palette)

    // set Field of View algorithm
    lib.attach(lib.shaddowFov, 'fov')

    lib.settings.load()
    lib.factory.mode().menu().ui()

    //trap('fadein')
    lab.screenKeeper.hideAll()

    let map = 0
    if (env.config.test) {
        if (isNumber(env.config.test)) {
            map = env.tune.testRange + env.config.test
        } else {
            map= env.tune.testRange + 1
        }

    } else if (env.config.map) {
        if (isNumber(env.config.map)) {
            map = env.config.map
        } else {
            throw 'map number is expected!'
        }
    }

    if (!map) {
        lab.screenKeeper.fadeTo('menu', {
            fadein: 0,
        })

    } else {
        // debug branch - jump straight to the game
        trap('newGame', {
            map: map,
            fade: {
                fadein:   0,
                keep:     0,
                fadeout: .5,
            },
        })
    }
}
