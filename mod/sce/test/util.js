const msg = 'ALL TESTS PASSED!'

function allTestsPassed() {
    if (env.config.test !== true) return
    log(msg)
    lab.mode.statusBar.status = msg
    lib.sfx('testsPassed')
}
