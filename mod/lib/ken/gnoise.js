// just like pnoise(), but returns values in range of [0..1]
function gnoise(x, y, z) {
    return (this.pnoise(x, y, z) + 1)/2
}
