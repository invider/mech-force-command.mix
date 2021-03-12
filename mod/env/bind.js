const actions = {
    NONE: -1,
    UP:    0,
    LEFT:  1,
    DOWN:  2,
    RIGHT: 3,
    NEXT:  4,
    PREV:  5,
    USE:   6,
    OPT:   7,
}

const keyboard = [
    [ 'KeyW', 'KeyA', 'KeyS', 'KeyD',
        'KeyE', 'KeyQ', 'KeyX', 'KeyZ'],
    [ 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
        'PageDown', 'PageUp', 'ShiftRight', 'Enter' ],
    [ 'KeyK', 'KeyH', 'KeyJ', 'KeyL',
        'BracketRight', 'BracketLeft', 'KeyM', 'KeyU' ],
    [ 'Numpad8', 'Numpad4', 'Numpad2', 'Numpad6',
        'NumpadEnter', 'NumpadSubstract', 'Numpad7', 'Numpad9',
    ],
]

const keyMap = {}

const padMap = [
    [12, 14, 13, 15, 1, 3, 0],
    [12, 14, 13, 15, 1, 3, 0],
    [12, 14, 13, 15, 1, 3, 0],
    [12, 14, 13, 15, 1, 3, 0],
]

function indexKeys() {
    for (let p = 0; p < keyboard.length; p++) {
        const actions = keyboard[p]
        for (let a = 0; a < actions.length; a++) {
            const key = actions[a]
            keyMap[key] = {
                id: a,
                player: p,
            }
        }
    }
}

function init() {
    indexKeys()
    augment(_, actions)
}
