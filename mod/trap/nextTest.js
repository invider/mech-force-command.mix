function nextTest() {
    if (env.autoProgress) {
        log(env.itest + ' === ' + (_.sce.test.land.length - 1))
        if (env.itest === _.sce.test.land.length - 1) {
            _.sce.test.util.allTestsPassed()
        }
        trap('levelUp')
    } else {
        _.sce.test.util.testPassed()
    }
}
