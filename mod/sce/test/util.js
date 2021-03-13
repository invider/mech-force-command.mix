const TEST_PASSED = 'TEST PASSED!'
const ALL_PASSED = 'ALL TESTS PASSED!'

function testPassed() {
    if (env.config.test === true) return

    log(TEST_PASSED)
    lab.mode.statusBar.status = TEST_PASSED
    lib.sfx('testsPassed')
}

function allTestsPassed() {
    if (env.config.test !== true) return

    log('=== ' + ALL_PASSED + ' ===')
    lab.mode.statusBar.status = ALL_PASSED
    lib.sfx('testsPassed')
}
