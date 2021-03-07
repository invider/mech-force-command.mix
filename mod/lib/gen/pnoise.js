// Perlin Noise
//
// Adapted from Renderman Shadding Language implementation from
// Texturing and Modeling: A Procedural Approach 3rd ed. book.
//

const TABSIZE = 256
const TABMASK = TABSIZE - 1

const permutation = [
    225, 155, 210, 108, 175, 199, 221, 144,
    203, 116,  70, 213,  69, 158,  33, 252,
      5,  82, 173, 133, 222, 139, 174,  27, 
      9,  71,  90, 246,  75, 130,  91, 191,
    169, 138,   2, 151, 194, 235,  81,   7,
     25, 113, 228, 159, 205, 253, 134, 142,
    248,  65, 224, 217,  22, 121, 229,  63, 
     89, 103,  96, 104, 156,  17, 201, 129,
     36,   8, 165, 110, 237, 117, 231,  56,
    132, 211, 152,  20, 181, 111, 239, 218,
    170, 163,  51, 172, 157,  47,  80, 212,
    176, 250,  87,  49,  99, 242, 136, 189,
    162, 115,  44,  43, 124,  94, 150,  16,
    141, 247,  32,  10, 198, 223, 255,  72,
     53, 131,  84,  57, 220, 197,  58,  50,
    208,  11, 241,  28,   3, 192,  62, 202,
     18, 215, 153,  24,  76,  41,  15, 179,
     39,  46,  55,   6, 128, 167,  23, 188,
    106,  34, 187, 140, 164,  73, 112, 182,
    244, 195, 227,  13,  35,  77, 196, 185,
     26, 200, 226, 119,  31, 123, 168, 125,
    249,  68, 183, 230, 177, 135, 160, 180,
     12,   1, 243, 148, 102, 166,  38, 238,
    251,  37, 240, 126,  64,  74, 161,  40,
    184, 149, 171, 178, 101,  66,  29,  59,
    146,  61, 254, 107,  42,  86, 154,   4,
    236, 232, 120,  21, 233, 209,  45,  98,
    193, 114,  78,  19, 206,  14, 118, 127,
     48,  79, 147,  85,  30, 207, 219,  54,
     88, 234, 190, 122,  95,  67, 143, 109,
    137, 214, 145,  93,  92, 100, 245,   0,
    216, 186,  60,  83, 105,  97, 204,  52,
]

const p = []
// fill array with permutation set x2 times
for (let i = 0; i < 256; i++) {
    p[256 + i] = p[i] = permutation[i]
}

/*
function permVal(x) {
    return permutation[x & TABMASK] / TABMASK
}
*/

function vlattice(x, y, z) {
    x = x * 617 + y * 769
    x += z * 997 * x
    return (permutation[x & TABMASK]/TABMASK)
}

function fade(t) {
	//return t * t * t * (t * (t * 6 - 15) + 10)
    return 6 * t*t*t*t*t - 15 * t*t*t*t + 10 * t*t*t
}

function lerp2(v, s, e) {
    return s + (e - s) * v
}

function grad(hash, dx, dy, dz) {
    const h = hash & 15
    const u = h < 8? dx : dy
    const v = h < 4? dy : ( h === 12 || h === 14? dx : dz )
    return (((h&1) === 0? dy : -u) + ((h&2) === 0? v : -v))
}

function pnoise(x, y, z) {
    const X = floor(x) & TABMASK
    const Y = floor(y) & TABMASK
    const Z = floor(z) & TABMASK

    // compute delta within cube unit
    const dx = x % 1, dy = y % 1, dz = z % 1
    // compute easing curves
    const fx = fade(dx), fy = fade(dy), fz = fade(dz)

    // hash coordinates of the 8 cube corners
    const A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z
    const B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z

    // blend results from 8 corners of cube
    return lerp2(fz,
            lerp2(fy,
                lerp2(fx, grad(p[AA  ], dx  , dy  , dz  ),
                          grad(p[BA  ], dx-1, dy  , dz  )),
                lerp2(fx, grad(p[AB  ], dx  , dy-1, dz  ),
                          grad(p[BB  ], dx-1, dy-1, dz  ))
            ),
            lerp2(fy,
                lerp2(fx, grad(p[AA+1], dx  , dy  , dz-1),
                          grad(p[BA+1], dx-1, dy  , dz-1)),
                lerp2(fx, grad(p[AB+1], dx  , dy-1, dz-1),
                          grad(p[BB+1], dx-1, dy-1, dz-1))
            )
    )
}

/*
function pnoise(x, y, z) {
    let ix = floor(x)
    let fx = x - ix

    let iy = floor(y)
    let fy = y - iy

    let iz = floor(z)
    let fz = z - iz

    const v0 = vlattice(ix, iy, iz)
    const v1 = vlattice(ix+1, iy, iz)
    const v2 = vlattice(ix+1, iy+1, iz)
    const v3 = vlattice(ix, iy+1, iz)
    const v4 = vlattice(ix, iy, iz+1)
    const v5 = vlattice(ix+1, iy, iz+1)
    const v6 = vlattice(ix+1, iy+1, iz+1)
    const v7 = vlattice(ix, iy+1, iz+1)

    const v = lerp2(fx, v0, v1)
    return v
    //return vlattice(ix, iy, iz)

    /*
    let xknots = []
    let yknots = []
    let zknots = []
    for (let k = -1; k <= 2; k++) {
        for (let j = -1; j <= 2; j++) {
            for (let i = -1; i <= 2; i++) {
                xknots[i+1] = vlattice(ix+i, iy+j, iz+k)
            }
            yknots[j+1] = vlattice(ix, iy+j, iz+k)
        }
        zknots[k+1] = vlattice(ix, iy, iz+k)
    }
    return Math.random() * .5
}
*/

function normal(x, y, z) {
    const v = pnoise(x, y, z)
    return (v + 1)/2
}

function test() {
    let n = 0
    const tab = []
    for (let i = 0; i < permutation.length; i++) {
        const v = permutation[i]
        if (!tab[v]) tab[v] = true
        else throw `double value @${i}: ${v}`
        n++
    }

    for (let i = 0; i < permutation.length; i++) {
        if (!tab[i]) throw 'missing ' + i
    }
    return 'OK'
}

// export test() as a property of pnoise
pnoise.test = test
pnoise.normal = normal
