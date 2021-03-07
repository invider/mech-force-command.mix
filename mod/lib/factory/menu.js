function menu() {
    const tx = lab.textMode

    const mainMenu = tx.spawn('hud/Menu', {
        name: 'mainMenu',
        title: env.msg.title.toUpperCase(),
        subtitle: env.msg.author,
        items: [
            {
                name: env.msg.newGame,
                action: function(menu) {
                    trap('newGame', {
                        level: menu.items[1].level,
                    })
                }
            },
            {
                name: env.msg.map + ': 1',
                level: 1,

                actionNext: function() {
                    this.level = min(this.level + 1, env.tune.maxLevel)
                    this.name = env.msg.map + ': ' + this.level
                },
                actionPrev: function() {
                    if (this.level > 1) {
                        this.level --
                        this.name = env.msg.map + ': ' + this.level
                    }
                },
            },
            {
                name: 'Difficulty: Easy',
                diff: 1,

                actionNext: function() {
                    if (this.diff < 3) this.diff ++
                    this.updateTitle()
                }, 
                actionPrev: function() {
                    if (this.diff > 1) this.diff --
                    this.updateTitle()
                },
                updateTitle: function() {
                    let label
                    switch(this.diff) {
                        case 1: label = 'Easy'; break;
                        case 2: label = 'Normal'; break;
                        case 3: label = 'Hard'; break;
                        default: throw `unrecognized difficulty ${this.val}!`
                    }
                    this.name = 'Difficulty: ' + label
                },
                difficulty: function() {
                    return this.diff
                },
            },
        ]
    })
    lab.screenKeeper.define('menu', mainMenu)

    return this
}

