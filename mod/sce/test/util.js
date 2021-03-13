const msg = 'ALL TESTS PASSED!'

function allTestsPassed() {
    log(msg)
    lab.mode.statusBar.status = msg
    lib.sfx('testsPassed')
}
