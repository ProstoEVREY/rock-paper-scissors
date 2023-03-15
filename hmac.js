const rand = require('random-key')

class hmac {
    constructor() {
        this.key = this.generateKey()
    }
    generateKey() {
        return rand.generate(64)
    }
    generateHmac(token) {
        return require('crypto').createHmac('sha256', this.key)
            .update(token)
            .digest('hex')
    }
    get getKey() {
        return this.key
    }
    set setKey(key) {
        this.key = key
    }
}

module.exports = hmac