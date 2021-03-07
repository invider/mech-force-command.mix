//
// @depends(env/tune)
//

const df = {
    x: 0,
    y: 0,
    w: env.tune.defaultSegmentWidth,
    h: env.tune.defaultSegmentHeight,
    def: '.',
}

// Represents a squeare segment of the map
class Segment {

    constructor(st) {
        this.land = []
        this.explored = []

        this.hseparator = true

        augment(this, df)
        augment(this, st)
    }

    root() {
        if (this.__) {
            if (!this.__.root) {
                console.dir(this.__)
            }
            return this.__.root()
        }
        else return this
    }

    attach(segment) {
        const pos = this.qualify(segment.x, segment.y)
        if (pos) {
            if (!this.segmentHi) {
                this.segmentHi = segment
                segment.__ = this
                segment.hseparator = !this.hseparator
            } else {
                this.segmentHi.attach(segment)
            }
        } else {
            if (!this.segmentLow) {
                this.segmentLow = segment
                segment.__ = this
                segment.hseparator = !this.hseparator
            } else {
                this.segmentLow.attach(segment)
            }
        }
        return segment
    }

    isExplored(x, y) {
        if (!env.tune.hideUnexplored) return true

        if (this.ginside(x, y)) {
            // found the point within
            return !!this.explored[ (y-this.y) * this.w + (x-this.x) ]
        }

        // looking down the tree
        if (this.qualify(x, y)) {
            if (this.segmentHi) {
                return this.segmentHi.isExplored(x, y)
            }
        } else {
            if (this.segmentLow) {
                return this.segmentLow.isExplored(x, y)
            }
        }
        return
    }

    explore(x, y) {
        if (this.ginside(x, y)) {
            this.explored[ (y-this.y) * this.w + (x - this.x) ] = true
            if (this.onExplored) this.onExplored(x, y)
            return this
        }
        // looking down the tree
        if (this.qualify(x, y)) {
            if (this.segmentHi) {
                return this.segmentHi.explore(x, y)
            }
        } else {
            if (this.segmentLow) {
                return this.segmentLow.explore(x, y)
            }
        }
        return
    }

    get(x, y) {
        if (this.ginside(x, y)) {
            // the cell is inside this segment
            const lx = x - this.x
            const ly = y - this.y
            const l = this.land[ ly * this.w + lx ]
            return l || this.def
        }
        // looking down the tree
        if (this.qualify(x, y)) {
            if (this.segmentHi) return this.segmentHi.get(x, y)
        } else {
            if (this.segmentLow) return this.segmentLow.get(x, y)
        }
        return
    }

    set(x, y, l) {
        if (this.ginside(x, y)) {
            // the cell is inside this segment
            const lx = x - this.x
            const ly = y - this.y
            this.land[ly * this.w + lx] = l
            return this
        }
        // looking down the tree
        if (this.qualify(x, y)) {
            if (this.segmentHi) return this.segmentHi.set(x, y, l)
        } else {
            if (this.segmentLow) return this.segmentLow.set(x, y, l)
        }
        // TODO trap set on unexisted segment
        return
    }

    getSegment(x, y) {
        if (this.ginside(x, y)) return this
        if (this.qualify(x, y)) {
            if (this.segmentHi) {
                return this.segmentHi.getSegment(x, y)
            }
        } else {
            if (this.segmentLow) {
                return this.segmentLow.getSegment(x, y)
            }
        }
        return
    }

    lget(x, y) {
        const l = this.land[y * this.w + x]
        return l || this.def
    }

    lset(x, y, l) {
        if (x >= 0 && x < this.w && y >= 0 && y < this.h) {
            this.land[y * this.w + x] = l
            return this
        }
    }

    //
    // coordinate utils
    //

    lx(x) {
        return x - this.x
    }

    ly(y) {
        return y - this.y
    }

    gx(x) {
        return this.x + x
    }

    gy(y) {
        return this.y + y
    }

    linside(x, y) {
        return (x >= 0 && x < this.w && y >= 0 && y < this.h)
    }

    ginside(x, y) {
        x = x - this.x
        y = y - this.y
        return (x >= 0 && x < this.w && y >= 0 && y < this.h)
    }

    qualify(x, y) {
        if (this.hseparator) {
            if (y < this.y) return 0
            else return 1
        } else {
            if (x < this.x) return 0
            else return 1
        }
    }
}
