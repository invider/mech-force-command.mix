function showScenario(opt) {
    lab.mode.scenarioMenu.opt = opt
    lab.mode.scenarioView.setText( opt.story )
    lab.control.state.fadeTo('scenario')
}
