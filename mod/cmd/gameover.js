function gameover(args, cmd, con) {
    con.getMod().lib.control.hide() // hide console
    trap('gameover')
}
gameover.info = 'initiate gameover'

