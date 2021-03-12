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

function iorders() {
    if (!this.orders) return 0
    const i = env.tune.orders.indexOf(this.orders)
    return (i < 0? 0 : i)
}

function getOrders() {
    if (!this.orders) return env.tune.orders[0]
    return this.orders
}

function setOrders(orders) {
    this.orders = orders
}

function dump() {
    log('A: ' + dreg(this.A))
    log('B: ' + dreg(this.B))
    log('X: ' + dreg(this.X))
    log('Z: ' + dreg(this.Z))
}
