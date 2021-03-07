function click(e) {
    // dump object under the cursor
    const c = lab.textMode.pick(e.pageX, e.pageY)
    if (c) console.dir(c)
}
