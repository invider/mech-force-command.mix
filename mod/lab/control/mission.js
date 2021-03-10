const mission = {
    on: function(event, source, context) {
        const handler = this['on-' + event]
        if (handler) handler(source, context)
    },

    define: function(event, handler) {
        this['on-' + event] = handler
    },

    clear: function() {
        Object.keys(this).forEach(key => {
            if (key.startsWith('on-')) {
                delete this[key]
            }
        })
    },
}
