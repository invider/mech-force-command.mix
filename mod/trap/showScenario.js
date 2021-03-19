function showScenario(opt) {
    lab.mode.scenarioMenu.opt = opt
    lab.mode.scenarioView.setText( opt.land.story )
    lab.control.state.fadeTo('scenario')
}
