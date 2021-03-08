function capture(player) {
    const team = env.team[player]
    if (team) team.capture()
}
