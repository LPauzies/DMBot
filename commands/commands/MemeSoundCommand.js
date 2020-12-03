const SoundCommand = require('../SoundCommand.js');
const path = require('path');

class MemeSoundCommand extends SoundCommand.SoundCommand {

    constructor(prefix) {
        super(prefix, "meme", `Launch a meme sound to the current voice channel | example : ${prefix} meme combien`, path.join(__dirname, "../../static/sound/meme"));
    }

    // Overrided from SoundCommand
    execute(messageObject, ...args) {
        if (!args) {
            messageObject.reply("cannot play this meme sound, not provided :x:");
            return;
        }
        let argsSplitted = args[0].split(" ");
        if (argsSplitted[0] == "help") {
            messageObject.channel.send(this.generateHelpMessage());
        } else if (argsSplitted.length > 1 || argsSplitted[0] == "") {
            messageObject.reply(`you maybe need a bit of help, type ${this.prefix} ${this.keyword} help to know available memes`);
        } else {
            this.playSound(messageObject, args[0]);
        }
    }

    //Overrided from SoundCommand
    help() {
        return `${this.prefix} **${this.keyword}** <meme> => ${this.description}`;
    }

}

exports.MemeSoundCommand = MemeSoundCommand;