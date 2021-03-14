
const HBORDER = 5
const VBORDER = 5
const TSTEP = 5
const SSTEP = 4
const VSTEP = 3

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

    drawInverseTable() {
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

    drawTable() {
        const tx = this.__
        const w = tx.tw - 2*HBORDER
        const h = tx.th
        const t = this.table

        tx
            .back(lib.cidx('base'))
            .face(lib.cidx('alert'))

        function left(txt, x, y) {
            txt = '' + txt
            tx.at(x, y).print(txt)
        }

        function center(txt, x, y) {
            txt = '' + txt
            const halfWidth = ceil(txt.length/2)
            x = max(x - halfWidth, 0)
            tx.at(x, y).print(txt)
        }

        const rows = Object.keys(t)
        const clen = rows[0].length + 1

        let y = VBORDER
        rows.forEach((c, i) => {
            const cw = floor(w/(clen + 1))

            let x = HBORDER + cw
            if (i > 1) left(c, x-4, y)

            const ls = t[c]
            ls.forEach((e, j) => {
                const x = HBORDER + (j+2) * cw
                if (i === 0) center(e.toUpperCase(), x+4, y)
                else center(e, x+4, y)
            })
            if (i === 0) y += TSTEP
            else y += VSTEP
        })
    }

    draw() {
        if (this.inverse) this.drawInverse()
        else this.drawTable()
    }

    setTable(table) {
        if (!table) return
        this.table = table
    }
}
