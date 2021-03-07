// represents a 2-dimentional field of values [-1..1] along with a color image

const df = {
    w: 256,
    h: 256,
}

let id = 0
class ValueMap {

    constructor(st) {
        augment(this, df, st)
        if (!this.name) this.name = 'map' + (++id)

        this.map = []
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.ctx = this.canvas.getContext('2d')
        this.imgData = this.ctx.getImageData(0, 0, this.w, this.h)
    }

    // set the pixel to rgb values [0..1]
    rgb(x, y, r, g, b) {
        let sh = (y * this.w + x) * 4
        const R = limit(floor(r * 255), 0, 255)
        const G = limit(floor(g * 255), 0, 255)
        const B = limit(floor(b * 255), 0, 255)
        this.imgData.data[sh++] = R
        this.imgData.data[sh++] = G
        this.imgData.data[sh++] = B
        this.imgData.data[sh] = 255
    }

    // shift pixel [c] color on provided value [-1..1]
    // The resulting color value will be normalized if out of range.
    // @param {number/int} x - pixel x coordinate
    // @param {number/int} y - pixel y coordinate
    // @param {number/int} c - color picker (0 - red, 1 - green, 2 - blue)
    // @param {number} v - value in between [-1..1]
    shiftColor(x, y, c, v) {
        let sh = (y * this.w + x) * 4 + c
        this.imgData.data[sh] = limit(this.imgData.data[sh] + v*255, 0, 255)
    }

    // set monochrome pixel for provided field value [-1..1]
    mono(x, y, v) {
        let sh = (y * this.w + x) * 4
        v = (v + 1)/2 // map from -1..1 to 0..255
        this.rgb(x, y, v, v, v)
    }

    // put an rgb pixel for the provided field values [-1..1]
    put(x, y, r, g, b) {
        let sh = (y * this.w + x) * 4
        r = (r + 1)/2 // map from -1..1 to 0..1 range
        g = (g + 1)/2
        b = (b + 1)/2
        this.rgb(x, y, r, g, b)
    }

    // put a pixel for the provided field value [-1..1] filtered by function for each color chanel
    fput(x, y, v, filter) {
        if (!filter) {
            this.mono(x, y, v)
        } else {
            this.put(x, y,
                filter(1, v, x, y),
                filter(2, v, x, y),
                filter(3, v, x, y)
            )
        }
    }

    // get the field value at [x:y]
    // Returns -1 when outside of range.
    get(x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h_) return -1
        return this.map[y * this.w + x]
    }

    // get a normalized [0..1] range field value at [x:y]
    getn(x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h_) return 0
        return (this.map[y * this.w + x] + 1)/2
    }

    // set filed value
    set(x, y, v) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h_) return
        this.map[y * this.w + x] = v
    }

    // clear the field value and image at [x:y]
    clear(x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return
        if (this.get(x, y) > 1) return
        this.set(x, y, -1)
        //this.rgb(x, y, 0, 0, 0)
        this.shiftColor(x, y, 0, .15)
        this.shiftColor(x, y, 2, -.2)
    }

    // fill the field values using provided function and color filter
    fill(fn, filter) {
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const fx = (x/this.w * 2) - 1
                const fy = (y/this.h * 2) - 1
                const v = limit(fn(fx, fy), -1, 1)

                this.map[y*this.w + x] = v
                this.fput(x, y, v, filter)
            }
        }
        return this
    }

    // attach the value map to _/res/maps_ node
    save(name) {
        const gcanvas = document.createElement('canvas')
        gcanvas.width = this.w
        gcanvas.height = this.h
        const gctx = gcanvas.getContext('2d')
        gctx.putImageData(this.imgData, 0, 0)
        
        if (!res.maps) res.touch('maps')
        name = name || this.name
        res.maps.attach(gcanvas, name)
        return this
    }
}
ValueMap.RED_FILTER   = (c, v) => (c === 1? v : -1)
ValueMap.GREEN_FILTER = (c, v) => (c === 2? v : -1)
ValueMap.BLUE_FILTER  = (c, v) => (c === 3? v : -1)
ValueMap.CYAN_FILTER  = (c, v) => (c === 2 || c === 3? v : -1)

