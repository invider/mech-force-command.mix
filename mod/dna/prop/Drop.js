// @depends(dna/prop/Prop)

const df = {
    solid:  false,
    touchable: true,
    symbol: 'o',
    kind:   'energy pack',
}

class Drop extends dna.prop.Prop {

    constructor(st) {
        super( augment({}, df, st) )
    }

    touch(source) {
        if (source.kind !== 'mech') return true
        source.pickup(this)
        kill(this)
        return true
    }

    push(prop) {
        log('push')
    }
}
