const abort = {
    items: [
        {
            name: env.msg.resume,
            action: function(menu) {
                lab.control.state.fadeTo('game')
            }
        },
        {
            name: env.msg.abort,
            action: function(menu) {
                console.dir(lib.menu.main)
                menu.selectMore(lib.menu.main)
            }
        },
    ],
}
