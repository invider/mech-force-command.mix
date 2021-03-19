function listScenarios(src, skipFirst) {
    const menu = {
        items: [], 

        settings: {
            title: '=== Select Scenario ===',
        },

        onSelect: function(item, i) {
            log('selected: #' + i + ': ' + item.name)
            trap('showScenario', {
                map:   item.map,
                land:  item.land,
            })
        },
    }
    menu.items.itemStep = 1

    for (let i = skipFirst? 1 : 0; i < src.length; i++) {
        const land = src[i]
        menu.items.push({
            name: land.name,
            map:  i,
            land: src[i],
        })
    }

    menu.items.push({
        name: env.msg.back,
        action: function(menu) {
            menu.selectMore(lib.menu.main)
        },
    })

    return menu
}
