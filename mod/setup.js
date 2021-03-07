function setup() {
    augment(pal, env.palette)
    // set Field of View algorithm
    lib.attach(lib.shaddowFov, 'fov')

    lib.settings.load()
    lib.factory.ui()

    trap('fadein')
}
