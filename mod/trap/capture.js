function capture(player) {
    if (!lab.world) return
    const team = env.team[player]
    if (team) team.capture()
}
