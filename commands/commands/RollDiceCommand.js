const Command = require('../Command.js');

class RollDiceCommand extends Command.Command {

    constructor(prefix) {
        super(prefix, "roll", `Roll as many dice as desired | example : ${prefix} roll 2d8 + 1d6 + 14`);
    }

    parseArguments(messageContent) {
        let arguments = messageContent.
        return 
    }

    // Overrided from Command
    execute(messageObject, ...args) {
        if (args[0]) messageObject.reply(`ere is the link to invite me in another discord server ${args[0]}`);
    }

    //Overrided from Command
    help() {
        return `${this.prefix} ${this.keyword} => ${this.description}`;
    }

}

exports.InviteCommand = InviteCommand;