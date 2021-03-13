function nextTest() {
    if (env.autoProgress) {
        trap('levelUp')
    } else {
        _.sce.test.util.testPassed()
    }
}
