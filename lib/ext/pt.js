function pt(src) {
    if (!src) return
    src = src.trim()

    const res = []

    const lines = src.split('\n')
    lines.forEach(l => {
        const parts = Array.from(l.trim())
        res.push(parts)
    })

    return res
}
