function scenario() {

    const scenarioText = lab.mode.spawn( dna.hud.TextView, {
        Z: 1,
        name: 'scenarioView',

        adjust: function() {
            const tx = this.__
            this.y = 0
            this.x = 0
            this.w = tx.tw
            this.h = tx.th * .7
        },
    })

    const menu = lab.mode.spawn(dna.hud.Menu, {
        Z: 11,
        name: 'scenarioMenu',
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
                name: env.msg.accept,
                action: function(menu) {
                    trap('newGame', menu.opt)
                    //lab.mode.mainMenu.defineItems(lib.menu.main)
                    //lab.control.state.fadeTo('game')
                },
            },
            {
                name: env.msg.back,
                action: function(menu) {
                    lab.mode.mainMenu.defineItems(lib.menu.main)
                    lab.control.state.fadeTo('menu')
                },
            },
        ],
    })

    lab.control.state.define('scenario', [
        lab.mode.background, scenarioText, menu,
    ])

    return this
}
