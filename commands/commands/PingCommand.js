const Command = require('../Command.js');

class PingCommand extends Command.Command {

    constructor(prefix) {
        super(prefix, "ping", "Calculate latency between client and server");
    }

    // Overrided from Command
    execute(messageObject, ...args) {
        let ping = new Date().getTime() - messageObject.createdTimestamp;
        messageObject.channel.send(`Pong ! Latency : ${ping} ms`);
    }

    //Overrided from Command
    help() {
        return `${this.prefix} ${this.keyword} => ${this.description}`;
    }

}

exports.PingCommand = PingCommand;