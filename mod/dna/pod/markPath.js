// a debug pod that marks the platform's path with sand.
// Useful in pathfinding debug and similar cases.

const alias = 'markPath'

function next() {
    lab.world.set(this.__.x, this.__.y, '_')
}
