function click(e) {
    
    if (e.ctrlKey) {
        const land = lab.mode.pick(e.pageX, e.pageY, 'showLand')

    } else {
        // dump object under the cursor
        const c = lab.mode.pick(e.pageX, e.pageY)
        if (c) console.dir(c)
    }
}
