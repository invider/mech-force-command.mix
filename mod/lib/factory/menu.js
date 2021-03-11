function menu() {
    const tx = lab.mode

    const mainMenu = tx.spawn('hud/Menu', {
        name: 'mainMenu',
        title: env.msg.title.toUpperCase(),
        subtitle: env.msg.author,
        items: lib.menu.main,
    })
    lab.control.state.define('menu', mainMenu)

    return this
}

