function box(args, cmd, con) {
    const map = parseInt(args[1])
    if (isNaN(map)) return 'box id must be specified'

    con.getMod().lib.control.hide() // hide console
    trap('newGame', {
        map: env.tune.boxRange + map,
        fade: {
            fadein:  .5,
            keep:     0,
            fadeout: .5,
        },
    })
}
box.args = '<box-id>'
box.info = 'run the specified box'
