
function bindAllPlayers() {
    lab.control.player.bind(0, lab.world.hero)
    lab.control.player.bind(1, lab.world.hero)
    lab.control.player.bind(2, lab.world.hero)
}

function unbindAllPlayers() {
    lab.control.player.bind(0, false)
    lab.control.player.bind(1, false)
    lab.control.player.bind(2, false)
}
