function showScenario(opt) {
    lab.mode.scenarioMenu.opt = opt
    lab.mode.scenarioView.setText( _.sce.story.scenario[opt.map] )
    lab.control.state.fadeTo('scenario')
}
