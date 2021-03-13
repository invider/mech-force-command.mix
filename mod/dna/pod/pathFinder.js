const alias = 'pathFinder'

const neighbours = [
    { x:  0, y: -1 },
    { x: -1, y:  0 },
    { x:  0, y:  1 },
    { x:  1, y:  0 },
]

function onInstall() {
    this.step = 0
}

// Manhattan distance
function mdist(x1, y1, x2, y2) {
    return abs(x1 - x2) + abs(y1 - y2)
}

function match(n1, n2) {
    return (n1.x === n2.x && n1.y === n2.y)
}

function astar(world, start, target) {
    start.n = 0
    start.g = 0
    start.f = 0

    const open = [ start ]
    const close = []

    function highlight(path) {
        path.forEach(e => {
            world.setf(e.x, e.y, '#707010')
        })
    }


    function inOpen(node) {
        for (let i = 0; i < open.length; i++) {
            const e = open[i]
            if (e.x === node.x && e.y === node.y) return e
        }
        return null
    }

    function inClose(node) {
        for (let i = 0; i < close.length; i++) {
            const e = close[i]
            if (e.x === node.x && e.y === node.y) return e
        }
        return null
    }

    function removeFromClose(node) {
        const i = close.indexOf(node)
        if (i >= 0) close.splice(i, 1)
    }

    function shift(n, v) {
        const k = {
            parent: n,
            x: n.x + v.x,
            y: n.y + v.y,
            g: n.g + 1,
        }
        k.n = mdist(k.x, k.y, target.x, target.y)
        k.f = k.g + k.n
        return k
    }

    while(open.length > 0) {
        let icur = 0
        let cur = open[0]
        for (let i = 1; i < open.length; i++) {
            const e = open[i]
            if (e.f < cur.f) {
                cur = e
                icur = i
            }
        }

        // we have the next node to expore
        open.splice(icur, 1) // remove node from the open list
        close.push(cur)

        if (match(cur, target)) {
            // found it!
            const path = []
            let next = cur
            while (next) {
                path.push(next)
                next = next.parent
            }
            //highlight(path)
            return path
        }

        // for all the neighbours
        for (let i = 0; i < 4; i++) {
            const next = shift(cur, neighbours[i])

            // figure if we've visited that node before
            let f = 9999999
            const onext = inOpen(next)
            const cnext = inClose(next)
            if (onext && onext.f < f) f = onext.f
            if (cnext && cnext.f < f) f = cnext.f

            //if (!lab.world.isWalkable(next.x, next.y)) {
            if (lab.world.isOccupied(next.x, next.y)) {
                // skip non-walkable land
            } else if (f < next.f) {
                // skip this node - a better path to it is already found
            } else {
                if (cnext) removeFromClose(cnext)
                if (onext) {
                    // promote
                    onext.g = next.g
                    onext.n = next.n
                    onext.f = next.f
                    onext.parent = next.parent
                } else {
                    // nothing yet visited - just push in
                    open.push(next)
                }
            }
            /*
            if (!inOpen(next) && !inClose(next)) {
                next.parent = cur

            }
            */
        }
    }

    // no solution?
    return null
}

function findPath(x, y) {
    this.target = { x, y }

    const base = {
        x: this.__.x,
        y: this.__.y,
    }
    this.path = astar(lab.world, base, this.target)
}

function nextStep() {
    if (this.path && this.path.length > 0) {
        const cell = this.path.pop()

        if (this.__.y < cell.y) return 2
        if (this.__.x > cell.x) return 1
        if (this.__.y > cell.y) return 0
        if (this.__.x < cell.x) return 3
        return -1

    } else {
        return -1
        /*
        this.step ++
        if (this.step % 10 < 5) return 3
        else return 1
        */
    }
}
