// just like control
// but also schedules the world next()

// @depends(dna/pod/control)
const control = dna.pod.control

const totalControl = augment({}, control)

totalControl.alias = 'control'

// rename original control act()
totalControl.react = totalControl.act

totalControl.act = function act(action) {
    if (this.react(action)) {
        this.__._.scheduleNext()
        this.__._.onMovement()
    }
}
