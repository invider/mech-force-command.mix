function generateIsland(world, cfg) {
    const w = cfg.width || 64
    const h = cfg.height || 64
    const z = cfg.z || 0.8
    const dx = cfg.dx || 0
    const dy = cfg.dy || 0
    const scale = cfg.scale || 12
    world.width = w
    world.height = h

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h

    const cx = floor(w/2)
    const cy = floor(h/2)
    const r = floor(.5 * w)

    const ctx2 = canvas.getContext('2d')
    const imgData = ctx.getImageData(0, 0, w, h)

    function quarter(x, y) {
        const qx = x < w/2? 0 : 1
        const qy = y < h/2? 0 : 1
        if (qx === 0 && qy === 0) return 1
        else if (qx === 1 && qy === 0) return 2
        else if (qx === 0 && qy === 1) return 3
        else return 4
    }

    function mono(x, y, v) {
        let sh = (y * w + x) * 4
        const c = clamp(floor(v * 255), 0, 255)
        imgData.data[sh++] = c
        imgData.data[sh++] = c
        imgData.data[sh++] = c
        imgData.data[sh] = 255
    }

    function rgb(x, y, r, g, b) {
        let sh = (y * w + x) * 4
        const R = clamp(floor(r * 255), 0, 255)
        const G = clamp(floor(g * 255), 0, 255)
        const B = clamp(floor(b * 255), 0, 255)
        imgData.data[sh++] = R
        imgData.data[sh++] = G
        imgData.data[sh++] = B
        imgData.data[sh] = 255
    }

    function rgbv(x, y, r, g, b, delta, val) {
        rgb(x, y,
            r + delta * val,
            g + delta * val,
            b + delta * val,
        )
    }

    function circleGradientFilter(x, y, v) {
        const distToCenter = length(x-cx, y-cy)
        const heightFactor = 1 - distToCenter / r
        const nv = v * heightFactor
        return clamp(nv, 0, 1)
    }

    let minV = 10
    let maxV = 0
    let over = 0
    const overclamp = .5
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const v = lib.ken.gnoise(
                (dx + x/w) * scale,
                (dy + y/h) * scale, z
            )
            const v2 = circleGradientFilter(x, y, v)
            if (v2 < minV) minV = v2
            if (v2 > maxV) maxV = v2
            if (v2 > overclamp) over ++

            // moisture noise
            const moistureVal = lib.ken.gnoise(
                (13*dx + x/w) * scale * 20,
                (11*dy + y/h) * scale * 20,
                z
            )

            // grass noise
            const gv = lib.ken.gnoise(
                (9*dx + x/w) * scale * 10,
                (17*dy + y/h) * scale * 10,
                z
            )

            // ocean noise
            const oceanNoise = lib.ken.gnoise(
                (11*dx + x/w) * scale * 2,
                (29*dy + y/h) * scale * 2,
                z
            )

            if (v2 < cfg.level.water) {
                rgbv(x, y, 0, .3, .7, .1, oceanNoise)
                world.set(x, y, '~')

            } else if (v2 < cfg.level.sand) {
                rgbv(x, y, .5, .5, .1, .4, moistureVal)
                world.set(x, y, '_')

            } else if (v2 < cfg.level.stone) {
                const grass = cfg.level.stone - cfg.level.sand
                const v3 = 1 - (cfg.level.stone - v2)/grass
                const v4 = round(v3 * 4) / 4

                rgbv(x, y, .1, .3, .05, .3, v4 * gv)

                world.set(x, y, '.')

                /*
                if (mv > cfg.level.rocks) {
                    world.spawn({ symbol: 'o', x: x, y: y, })
                }
                */

            } else if (v2 < cfg.level.ice) {
                const stone = cfg.level.ice - cfg.level.stone
                const v3 = 1 - (cfg.level.ice - v2)/stone
                const v4 = round(v3 * 4) / 4

                rgbv(x, y, .4, .15, .1, .4, v4)

                world.set(x, y, '"')

                /*
                if (mv > cfg.level.rocks) {
                    world.spawn({ symbol: 'o', x: x, y: y, })
                }

                if (rabbitNoise > cfg.level.rabbits) {
                    world.spawn(new dna.bad.Rabbit({
                        x: x,
                        y: y,
                    }))
                }
                */

            } else {
                mono(x, y, v2 + .3)
                world.set(x, y, '^')
            }

            if (v2 > cfg.level.sand
                    && v2 < cfg.level.stone
                    && moistureVal > cfg.level.mech) {
                const s = floor(rnd() * 2)
                const q = quarter(x, y)
                world.spawn( dna.bot.Mech, {
                    team: q * s,
                    x: x,
                    y: y,
                })
            }

        }
    }

    /*
    log('--------------')
    log('MIN: ' + minV)
    log('MAX: ' + maxV)
    log('OVER: ' + over)
    log('--------------')
    */

    ctx2.putImageData(imgData, 0, 0)
    res.attach(canvas, 'island')
}
