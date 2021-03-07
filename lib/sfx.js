module.exports = function(name, vol, pan) {
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
