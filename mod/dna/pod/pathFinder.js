const alias = 'pathFinder'

function onInstall() {
    this.step = 0
}

function findPath(x, y) {
    this.target = { x, y }
}

function nextStep() {
    this.step ++
    if (this.step % 10 < 5) return 3
    else return 1
}
