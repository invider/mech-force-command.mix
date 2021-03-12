const catalog = {}

function serial(kind) {
    if (!catalog[kind]) {
        catalog[kind] = 1
        return 1
    }
    return ++catalog[kind]
}

serial.reset = function() {
    Object.keys(catalog).forEach(k => {
        catalog[k] = 0
    })
}
