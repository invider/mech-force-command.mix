const fn = function(args, cmd, con) {
    con.getMod().lib.control.hide() // hide console
    trap('levelUp')
}
fn.info = 'jump to the next level'

module.exports = fn


