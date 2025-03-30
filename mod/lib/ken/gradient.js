// circle gradient
// Soft gradient on values depending on the distance to internal radius.
// All coordinates are assumed to be within [-1..1] square,
// and provided value is a noise within [-1..1].
function circleGradient(r1, r2, fx, fy, v) {
    let dist = length(fx, fy)
    if (dist < r1) return v
    const elevation = 1 - (dist - r1) / (r2 - r1)
    return ((v + 1) * elevation) - 1
}

function verticalLinearGradient(l1, l2, fx, fy, v) {
    const y = (fy + 1)/2
    const elevation = clamp((y - l1)/(l2 - l1), 0, 1)
    return ((v + 1) * elevation) - 1
}

// mushroom-like form filter
function mushroomFilter(fx, fy, v) {
    fx = 1-pow(.3, abs(fx))
    fy = 1-(fy + 1)/2
    if (fx < fy) return v
    else return -1
}

function landscapeGradient(level, scale, fq, fx, fy, v) {
    const y = (fy + 1)/2
    const x = (fx + 1)/2
    const n = (v + 1)/2
    if (y > level) return v

    const f = (sin(2*x*fq) + sin(PI * x * fq) + 2)/4 * scale
    //const f = lib.ken.pnoise.normal(1 + x * fq, 101, 101)

    const yl = 1-y/level // 0..1 value of the peak inverted from level
    if (yl > f) return -1
    else return ((1 - yl/f)*n * 2) - 1

    //const peak = level - f*level
    //const yl = (y/level)
    //if (yl > f) return .3
    //else return -1
    //const n1 = (y/level)
    //return (n1 * 2) - 1

    /*
    const peak = level * f
    const overflow = level - peak
    const n2 = (y-overflow/peak) * n
    if (n2 < 0) return -1
    return (n2 * 2) - 1
    */

    /*
    const peak = (1-level) * scale * f
    if (fy < (1 - level - peak)) return -1
    return 
    */
}

function sinusoidLandscapeGradient(shift, fq, fx, fy, v) {
    const x = fq * ((fx + 1)/2)
    const by = sin(2*x) + sin(PI * x)
}

