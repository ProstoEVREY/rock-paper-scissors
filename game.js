const prompt = require('prompt-sync')()
const hmac = require('./hmac.js')
const rules = require('./rules.js')
const help = require('./help.js')


class Game {
    menu(args) {
        let count = 0
        let hashTb = {}
        args.forEach(element => {
            console.log(`${++count} - ${element}`)
            hashTb[count] = element
        })
        console.log(`0 - exit`)
        console.log(`? - help`)
        hashTb[0] = 'exit'
        hashTb['?'] = 'help'

        let answer = this.ask().toString()
        if (!(answer in hashTb)) {
            return 1
        }
        return { answer, hashTb }
    }

    launch() {
        const args = process.argv
        args.shift()
        args.shift()

        if (!args.length) {
            console.log("The options are missing. Try again with parameters")
            console.log("For example: 'node rps.js ROCK PAPER SCISSORS' (remember that number of arguments should be odd and >1)")
            return
        }


        if (!(args.length % 2)) {
            console.log("Number of args is incorrect")
            console.log("For example: 'node rps.js ROCK PAPER SCISSORS' (remember that number of arguments should be odd and >1)")
            return
        }

        let h = new hmac()
        let r = new rules(args)

        const computerMove = r.computerMove(args)
        const hmacFinal = h.generateHmac(computerMove)
        console.log(`HMAC: ${hmacFinal}`)


        let obj = this.popMenu(args)
        if (obj.answer == '0') {
            return
        }
        else if (obj.answer == '?') {
            const hlp = new help(args)
            hlp.printHelp()
            obj = this.popMenu(args)
        }

        console.log(`Your move: ${obj.hashTb[obj.answer]}`)
        console.log(`Computer move: ${computerMove}`)

        r.victoryLog(r.victory(obj.hashTb[obj.answer], computerMove))
        console.log(`HMAC key: ${h.key}`)

    }

    game() {
        this.launch()
    }

    ask() {
        let answer = prompt('Choose your move: ')
        return answer
    }
    popMenu(args) {
        let obj = this.menu(args)
        while (!obj.hashTb?.hasOwnProperty(obj.answer)) {
            console.log("Wrong move, choose the one from the table!")
            obj = this.menu(args)
        }
        return obj
    }
}

const game = new Game()
game.game()
