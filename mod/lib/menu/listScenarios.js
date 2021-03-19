function listScenarios(src, skipFirst) {
    const menu = {
        items: [], 

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
    return menu
}
