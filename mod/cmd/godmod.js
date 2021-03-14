function godmod(args, cmd, con) {
    const target = lab.mode.port1.target.focus
    if (target) {
        target.god = true
        return 'set godmod for [' + target.title + ']'
    } else {
        return 'no target mech in port 1!'
    }
}
godmod.info = 'set the god mode for the current mech in port 1'

