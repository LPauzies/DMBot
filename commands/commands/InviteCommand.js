const Command = require('../Command.js');

class InviteCommand extends Command.Command {

    constructor(prefix) {
        super(prefix, "invite", "Generate invitation link of DMBot");
    }

    // Overrided from Command
    execute(messageObject, ...args) {
        if (args[0]) messageObject.reply(`here is the link to invite me in another discord server ${args[0]}`);
    }

    //Overrided from Command
    help() {
        return `${this.prefix} ${this.keyword} => ${this.description}`;
    }

}

exports.InviteCommand = InviteCommand;