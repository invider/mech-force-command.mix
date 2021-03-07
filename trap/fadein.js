function fadein() {
    lab.textMode.hidden = true
    lab.spawn(dna.hud.Transition, {
        Z: 1001,
        fadein: 0,
        keep: .5,
        fadeout: .5,

        onFadeout: function() {
            lab.textMode.hidden = false
        }
    })
}
