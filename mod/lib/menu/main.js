const main = {
    items: [
        {
            name: env.msg.newGame,
            action: function(menu) {
                menu.selectMore(lib.menu.listScenarios( _.sce.land, true ))
                /*
                const map = menu.items[1].map
                trap('showScenario', {
                    map: map,
                    land:  _.sce.land[map],
                    story: _.sce.story[map],
                })
                */
            }
        },
        /*
        {
            sync: function() {
                this.name = this.map + '.' + this.options[this.map].name
            },
            define: function(menu) {
                this.map = 1
                this.options = _.sce.land
                this.sync()
            },
            actionNext: function() {
                this.map = min(this.map + 1, this.options.length - 1)
                this.sync()
            },
            actionPrev: function() {
                if (this.map > 1) {
                    this.map --
                    this.sync()
                }
            },
        },
        */
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
