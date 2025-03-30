function soundFx(name, vol, pan) {
    vol = vol || 1

    let clip = res.sfx[name]
    let config = env.sfx[name]

    if (!config) {
        config = env.sfx['default']
        if (!clip) {
            log.warn(`missing config for sfx [${name}], using default`)
        }
    } else {
        if (config.res) clip = res.sfx[config.res]
    }

    if (config.vol) vol *= config.vol
    if (!clip) {
        clip = res.sfx['buzz']
        log.warn(`missing resource for [${name}], using default tone`)
    }

    //log(`plaing [${name}]`)
    sfx(clip, vol, pan)
}

soundFx.at = function(name, x, y) {
    // determine in view
    let inView = false
    let minDist = 99999
    env.ports.forEach(port => {
        const dist = port.distToCenter(x, y)
        if (dist < minDist) minDist = dist
        if (port.inView(x, y)) inView = true
    })

    if (inView) {
        soundFx(name)
    } else {
        // somewhere out
        const fade = 1 - clamp(minDist/env.tune.sfxFade, 0, 1)
        const vol = env.tune.minVolume + (1-env.tune.minVolume) * fade
        soundFx(name, vol)
    }
}

module.exports = soundFx
