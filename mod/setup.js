function setup() {
    augment(pal, env.palette)

    // pack missions
    $.sce.land = lib.util.packArray($.sce.land)
    $.sce.story = lib.util.packArray($.sce.story)
    $.sce.train.land = lib.util.packArray($.sce.train.land)
    $.sce.train.story = lib.util.packArray($.sce.train.story)

    // set Field of View algorithm
    lib.attach(lib.shaddowFov, 'fov')

    lib.settings.load()
    lib.factory.mode().menu().ui().scenario().final()

    //trap('fadein')
    lab.control.state.hideAll()

    let map = 0
    if (env.config.box) {
        const ibox = parseInt(env.config.box)
        if (isNumber(ibox) && !isNaN(ibox)) {
            map = env.tune.boxRange + ibox
        } else {
            map = env.tune.boxRange + 1
        }

    } else if (env.config.test) {
        const itest = parseInt(env.config.test)
        if (isNumber(itest) && !isNaN(itest)) {
            map = env.tune.testRange + itest
            env.autoProgress = false
        } else {
            map = env.tune.testRange + 1
            env.autoProgress = true
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
