function handleOpt(e) {
    switch(e.code) {
        case 'KeyT':
            lab.world.autoevolve = !lab.world.autoevolve
            break
        case 'KeyF':
            lab.world.fast = !lab.world.fast
            break
    }
}

function handleControl(e) {
    switch(e.code) {
        case 'Minus':
            lab.textMode.zoomOut()
            lib.settings.save()
            break
        case 'Equal':
            lab.textMode.zoomIn()
            lib.settings.save()
            break

        case 'KeyP':
            lab.world.paused = !lab.world.paused
            break

        case 'F7':
            if (res.island) {
                const data = res.island.toDataURL()
                lib.img.downloadDataURL(data, 'map')
            }
            break
        case 'F8':
            lib.img.screenshot(env.tune.app)
            break
    }
}

function keyDown(e) {
    if (e.repeat) return

    const action = env.bind.keyMap[e.code]

    if (e.metaKey || e.altKey || e.ctrlKey) {
        handleOpt(e)
        return
    }

    if (action) {
        if (lab.world && lab.world.paused) lab.world.paused = false
        lab.control.player.act(action.id, action.player)

    } else {
        handleControl(e)
    }
}
