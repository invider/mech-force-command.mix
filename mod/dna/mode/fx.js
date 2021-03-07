// list of possible text effects
const fx = [
    {
        set: function(fx, tx, i) {},
        evo: function(dt, fx, tx, i) {},
        unset: function(fx, tx, i) {},
    },
    {
        set: function(fx, tx, i) {
            fx.period = 1
            fx.timer = 0
        },
        evo: function(dt, fx, tx, i) {
            let st = 0
            if (fx.timer > fx.period) {
                st = 1
            }
            fx.timer += dt

            if ((st === 0 && fx.timer > fx.period)
                    || fx.timer > 2*fx.period) {

                // swap face and back styles
                const face = tx.buf.face[i]
                const back = tx.buf.back[i]
                tx.buf.face[i] = back
                tx.buf.back[i] = face

                if (st === 1) {
                    fx.timer = 0
                }
            }
        },
    },
]
