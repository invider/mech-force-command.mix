const STORE = 'mech-force-command-settings'

// sync settings in env/settings with scene
function syncOut() {
    if (lab.mode) lab.mode.setZoom( env.settings.zoom )
}

// sync scene settings into env/settings
function syncIn() {
    env.settings.zoom = lab.mode.getZoom()
}

function load() {
    const settings = lib.store.loadJSON(STORE)
    if (settings) {
        log('loaded settings: ')
        log.list(settings)
        augment(env.settings, settings)
    } else {
        log('no settings found')
    }
    syncOut()
}

function saveFn() {
    syncIn()
    const settings = augment({}, env.settings)
    delete settings.name
    //log('saving settings: ')
    //log.list(settings)
    lib.store.saveJSON(STORE, settings)
}
this.save = saveFn
