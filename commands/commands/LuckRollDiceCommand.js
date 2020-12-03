const Command = require('../Command.js');

class LuckRollDiceCommand extends Command.Command {

    constructor(prefix) {
        super(prefix, "luckroll", `Roll the d20 luck roll for a party`);
    }

    // Overrided from Command
    execute(messageObject, ...args) {
        let roll = Math.ceil(Math.random() * (19)) + 1;
        messageObject.channel.send(`:game_die: Luck dice : ${roll}`);
    }

    //Overrided from Command
    help() {
        return `${this.prefix} **${this.keyword}** => ${this.description}`;
    }

}

exports.LuckRollDiceCommand = LuckRollDiceCommand;