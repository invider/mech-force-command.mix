const A = null
const B = null
const X = null
const Z = null

function findRegVal(reg, list) {
    const r = this[reg]
    return list.indexOf(r)
}

function dreg(reg) {
    if (!reg) return '- none -'
    else return (reg.title || reg.name)
}

function dump() {
    log('A: ' + dreg(this.A))
    log('B: ' + dreg(this.B))
    log('X: ' + dreg(this.X))
    log('Z: ' + dreg(this.Z))
}
