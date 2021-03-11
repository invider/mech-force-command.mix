function setup() {
    augment(pal, env.palette)

    // set Field of View algorithm
    lib.attach(lib.shaddowFov, 'fov')

    lib.settings.load()
    lib.factory.mode().menu().ui()

    //trap('fadein')
    lab.control.state.hideAll()

    let map = 0
    if (env.config.test) {
        const itest = parseInt(env.config.test)
        if (isNumber(itest)) {
            map = env.tune.testRange + itest
        } else {
            map = env.tune.testRange + 1
        }

    } else if (env.config.map) {
        map = parseInt(env.config.map)
        if (!isNumber(map)) {
            throw 'map number is expected!'
        }
    }

    if (!map) {
        lab.control.state.fadeTo('menu', {
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
