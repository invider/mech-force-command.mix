
const HBORDER = 5
const VBORDER = 5
const TSTEP = 4
const VSTEP = 2

class Table {

    constructor(st) {
        this.table = {
            '': ['units', 'survived', 'kills'],
            red: [101, 101, 101],
            blue: [101, 101, 101],
            green: [101, 101, 101],
            yellow: [101, 101, 101],
        }
        augment(this, st)
    }

    adjust() {}

    draw() {
        const tx = this.__
        const w = tx.tw - 2*HBORDER
        const h = tx.th
        const t = this.table

        tx
            .back(lib.cidx('base'))
            .face(lib.cidx('alert'))

        function center(txt, x, y) {
            txt = '' + txt
            const halfWidth = ceil(txt.length/2)
            x = max(x - halfWidth, 0)
            tx.at(x, y).print(txt)
        }

        const columns = Object.keys(t)
        const clen = columns.length

        columns.forEach((c, i) => {
            let y = VBORDER
            const cw = floor(w/(clen+1))
            const xpos = HBORDER + (i+1) * cw
            center(c, xpos, y)

            y += TSTEP
            const ls = t[c]
            ls.forEach(e => {
                center(e, xpos, y)
                y += VSTEP
            })
        })

    }
}
