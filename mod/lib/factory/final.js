function final() {

    const table = lab.mode.spawn( dna.hud.Table, {
        Z: 1,
    })

    const menu = lab.mode.spawn(dna.hud.Menu, {
        Z: 11,
        name: 'finalMenu',
        hidden: true,
        silentOpen: true,
        itemStep: 1,

        adjust: function() {
            const tx = this.__
            this.y = floor(tx.th * .7)
            this.x = 0
            this.w = tx.tw
            this.h = tx.th - this.y
        },
    })

    menu.defineItems({
        items: [
            {
                name: 'continue',
                action: function() {
                    lab.mode.mainMenu.defineItems(lib.menu.main)
                    lab.control.state.fadeTo('menu')
                },
            },
        ],
    })

    lab.control.state.define('gameover', [
        lab.mode.background, table, menu,
    ])

    return this
}
