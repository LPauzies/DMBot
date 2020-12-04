const Command = require("../Command");

class HelpCommand extends Command.Command {

    constructor(prefix, ...commands) {
        super(prefix, "help", "Generate help for DMBot");
        this.commands = ":interrobang: Here is the help of DMBot :interrobang:\n\n" + 
            this.help() + 
            "\n" + 
            commands.map(command => command.help()).join("\n");
    }

    // Overrided from Command
    execute(messageObject, ...args) {
        messageObject.channel.send(this.commands);
    }

    //Overrided from Command
    help() {
        return `${this.prefix} **${this.keyword}** => ${this.description}`;
    }

}

exports.HelpCommand = HelpCommand;