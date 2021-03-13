function test(args, cmd, con) {
    const map = parseInt(args[1])
    if (isNaN(map)) return 'test id must be specified'

    con.getMod().lib.control.hide() // hide console
    trap('newGame', {
        map: env.tune.testRange + map,
        fade: {
            fadein:  .5,
            keep:     0,
            fadeout: .5,
        },
    })
}
test.args = '<test-id>'
test.info = 'run the specified test'
