const Command = require("../Command");

class HelpCommand extends Command.Command {

    constructor(prefix, ...commands) {
        super(prefix, "help", "Generate help for DMBot");
        this.commands = "Here is the help of DMBot :interrobang::\n\t" + 
            this.help() + 
            "\n\t" + 
            commands.map(command => command.help()).join("\n\t");
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