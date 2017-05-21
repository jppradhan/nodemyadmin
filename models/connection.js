class connection {
    constructor () {
        this.connect = {}
    }
    static get () {
        return this.connect;
    }
    static set(instance) {
        this.connect = instance
    }
}

module.exports = connection;