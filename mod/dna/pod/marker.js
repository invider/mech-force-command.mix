function mark() {
    const team = env.team.get(this.__.team)
    const marker = team.nextMarker()
    log(`marking [${this.__.x}:${this.__.y}] as [${marker}] for ${team.name}`)

    lab.world.spawn(dna.prop.Marker, {
        id:   marker,
        team: this.__.team,
        x:    this.__.x,
        y:    this.__.y,
    })
    lib.sfx('mark')
}
