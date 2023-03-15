const { table } = require('table')
const rules = require('./rules')

class Help {
    constructor(args) {
        this.args = args
    }
    printHelp() {
        console.log("Help table for this round: ")
        const r = new rules(this.args)
        let final_table = [
            ["VS", ...this.args],
        ]
        let finished_table = r.victoryLogTable(this.args)
        let current_table = []
        let counter = 0
        for (let i = 0; i < finished_table.length; i++) {
            if (finished_table[i] !== '') {
                current_table.push(finished_table[i])
            }
            else {
                final_table.push([this.args[counter], ...current_table])
                current_table = []
                counter++
            }
        }
        console.log(table(final_table))
    }
}

module.exports = Help