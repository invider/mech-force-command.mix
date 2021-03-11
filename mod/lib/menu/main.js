const main = {
    items: [
        {
            name: env.msg.newGame,
            action: function(menu) {
                trap('newGame', {
                    map: menu.items[1].map,
                })
            }
        },
        {
            name: env.msg.map + ': 1',
            map: 1,

            actionNext: function() {
                this.map = min(this.map + 1, env.tune.maxLevel)
                this.name = env.msg.map + ': ' + this.map
            },
            actionPrev: function() {
                if (this.map > 1) {
                    this.map --
                    this.name = env.msg.map + ': ' + this.map
                }
            },
        },
        /*
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
        */
    ]
}
