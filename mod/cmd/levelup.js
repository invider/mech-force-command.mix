module.exports = function(args, cmd, con) {
    con.getMod().lib.control.hide() // hide console
    trap('levelUp')
}

