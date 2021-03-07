
const dir = {
    base: hsl(.45, .1, .1),
    baseHi: hsl(.45, .2, .2),
    baseLow: hsl(.45, .15, .15),
    text: hsl(.45, .5, .6),
    'alert': hsl(.1,  .5, .7),

    shaddow: '#606062',
    land: hsl(.45, .5, .6),
    sand: '#e0bb26',
    water: '#1d74c4',
    forest: '#598a48',
    ice: '#53c9e0',
    infected: '#eb3434',

    dark: '101010',
}

const ls = [
    '#151515',
    hsl(.40, .2, .3),
]

// color name -> palette index map
const index = {}

// get color index by name
function cidx(color) {
    const i = index[color]
    return i || 0
}

function init() {
    Object.keys(dir).forEach(k => {
        const v = dir[k]
        ls.push(v)
        index[k] = ls.length - 1
    })
    lib.cidx = cidx
}

