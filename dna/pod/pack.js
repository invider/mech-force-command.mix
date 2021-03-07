const alias = 'pack'

const capacity = 10

function onInstall() {
    this.item = {}
    this.itemCount = 0
}

function grab(type) {
    if (this.freeSpace() <= 0) return false

    if (!this.item[type]) {
        this.item[type] = 1
        this.itemCount ++
    } else {
        this.item[type] ++ 
    }
    return true
}

function drop(type) {
    if (!this.item[type]) return 0  // nothing to drop

    const mob = this.__
    const world = mob._
    if (world.getProp(mob.x, mob.y)) return 0 // occupido

    this.item[type] --
    if (this.item[type] === 0) {
        delete this.item[type]
        this.itemCount --
        return -1
    }
    return 1
}

function dropAny() {
    if (this.itemCount === 0) return 0

    // get the first fit
    const type = Object.keys(this.item)[0]
    return this.drop(type)
}

function freeSpace() {
    return (this.capacity - Object.values(this.item).reduce((a, b) => a + b, 0))
}

function onDeinstall() {}
