const fn = function(args, cmd, con) {
    const map = parseInt(args[1])
    if (isNaN(map)) return 'map must be specified'

    con.getMod().lib.control.hide() // hide console
    trap('newGame', {
        map: map,
    })
}
fn.args = '<map-index>'
fn.info = 'open the specified map'

module.exports = fn

