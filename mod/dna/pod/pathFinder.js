const alias = 'pathFinder'

function onInstall() {
    this.step = 0
}

// Manhattan distance
function mdist(x1, y1, x2, y2) {
    return abs(x1 - x2) + abs(y1 - y2)
}

function astar(startNode, targetNode) {
    log('plotting path: ')
    log.list(startNode)
    log.list(targetNode)

    const open = [ startNode, ]
    const close = []
    
}

function findPath(x, y) {
    this.target = { x, y }

    const base = {
        x: this.__.x,
        y: this.__.y,
    }
    astar(base, this.target)
}

function nextStep() {
    this.step ++
    if (this.step % 10 < 5) return 3
    else return 1
}
