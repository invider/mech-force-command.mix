function levelUp() {
    let imap = env.imap || 0
    imap ++

    if (imap >= env.tune.testRange) {
        if (imap - env.tune.testRange >= $.sce.test.land.length) imap = env.tune.testRange + 1
    } else {
        if (imap >= $.sce.land.length) imap = 1
    }

    lab.control.state.fadeTo('game', {
        onShow: function() {
            lib.factory.world(imap)
        },
    })
}
