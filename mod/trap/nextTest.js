function nextTest() {
    if (env.autoProgress) {
        if (env.test === _.sce.test.land.length - 1) {
            _.sce.test.util.allTestsPassed()
        }
        trap('levelUp')
    } else {
        _.sce.test.util.testPassed()
    }
}
