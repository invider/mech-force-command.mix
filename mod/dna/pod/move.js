const name = 'move'

function onInstall() {}

function dir(direction) {
    let move = false
    switch(direction) {
        case 0: move = this.up();    break;
        case 1: move = this.left();  break;
        case 2: move = this.down();  break;
        case 3: move = this.right(); break;
    }

    const port = lab.mode.port1.inFocus(this.__)
    if (move) {
        switch(port) {
            case 1: this.__.fsfx('step1'); break;
            case 2: this.__.fsfx('step2'); break;
            case 3: this.__.fsfx('step2'); break;
            case 4: this.__.fsfx('step2'); break;
        }
    } else {
        if (port) this.__.fsfx('misStep')
    }
    return move
}

function up() {
    const w = this.__._
    const x = this.__.x
    const y = this.__.y - 1

    const obstacle = w.isSolid(x, y)
    if (!obstacle) {
        w.touch(x, y, this.__)
        this.__.y = y
        return true

    } else {
        if (this.__.push) this.__.push(obstacle, 0)
        if (obstacle.pushedBy) obstacle.pushedBy(this.__, 0)
        return false
    }
}

function left() {
    const w = this.__._
    const x = this.__.x - 1
    const y = this.__.y

    const obstacle = w.isSolid(x, y)
    if (!obstacle) {
        w.touch(x, y, this.__)
        this.__.x = x
        return true

    } else {
        if (this.__.push) this.__.push(obstacle, 1)
        if (obstacle.pushedBy) obstacle.pushedBy(this.__, 1)
        return false
    }
}

function down() {
    const w = this.__._
    const x = this.__.x
    const y = this.__.y + 1

    const obstacle = w.isSolid(x, y)
    if (!obstacle) {
        w.touch(x, y, this.__)
        this.__.y = y
        return true

    } else {
        if (this.__.push) this.__.push(obstacle, 2)
        if (obstacle.pushedBy) obstacle.pushedBy(this.__, 2)
        return false
    }
}

function right() {
    const w = this.__._
    const x = this.__.x + 1
    const y = this.__.y

    const obstacle = w.isSolid(x, y)
    if (!obstacle) {
        w.touch(x, y, this.__)
        this.__.x = x
        return true

    } else {
        if (this.__.push) this.__.push(obstacle, 3)
        if (obstacle.pushedBy) obstacle.pushedBy(this.__, 3)
        return false
    }
}

function onRemove() {}
