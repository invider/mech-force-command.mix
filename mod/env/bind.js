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
        'KeyR', 'KeyF', 'KeyE', 'KeyQ'],
    [ 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
        'PageDown', 'PageUp', 'ShiftRight', 'Enter' ],
    [ 'KeyK', 'KeyH', 'KeyJ', 'KeyL',
        'BracketRight', 'BracketLeft', 'KeyU', 'KeyM' ],
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

function actionName(action) {
    let n = 'unknown'
    switch(action) {
        case _.NONE:  n = 'none'; break;
        case _.UP:    n = 'up';   break;
        case _.LEFT:  n = 'left'; break; 
        case _.DOWN:  n = 'down'; break; 
        case _.RIGHT: n = 'right'; break; 
        case _.NEXT:  n = 'next'; break; 
        case _.PREV:  n = 'prev'; break; 
        case _.USE:   n = 'use';  break; 
        case _.OPT:   n = 'opt';  break; 
    }
    return n
}

function init() {
    indexKeys()
    augment(_, actions)
}
