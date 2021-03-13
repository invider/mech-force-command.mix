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
                menu.selectMore(lib.menu.main)
            }
        },
    ],
}
