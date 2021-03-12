// light effects
const alias = 'lfx'

const MAX = .5

function onInstall() {
    this.val = 0
    this.speed = 2
    this.income = 0
    this.hue = 0
    this.sat = 0
}

function light(v, h, s) {
    if (h !== undefined) {
        this.hue = h || 0
        this.sat = s || 0
    }
    this.income += v
}

function evo(dt) {
    if (this.income > 0) {
        // raise to 1
        this.income -= dt * this.speed
        if (this.income < 0) this.income = 0
        this.val = min(this.val + dt * this.speed, MAX)
        this.__.bcolor = hsl(this.hue, this.sat, this.val)

    } else if (this.val > 0) {
        // drop to 0
        this.val = max(this.val - dt * this.speed, 0)
        if (this.val === 0) {
            this.hue = 0
            this.sat = 0
        }
        this.__.bcolor = hsla(this.hue, this.sat, this.val, this.val)
    }
}
