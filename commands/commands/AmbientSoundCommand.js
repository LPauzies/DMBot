const SoundCommand = require('../SoundCommand.js');
const path = require('path');

class AmbientSoundCommand extends SoundCommand.SoundCommand {

    constructor(prefix) {
        super(prefix, "ambient", `Launch an ambient sound to the current voice channel | example : ${prefix} ambient dungeon`, path.join(__dirname, "../../static/sound/ambient"));
    }

    // Overrided from SoundCommand
    execute(messageObject, ...args) {
        if (!args) {
            messageObject.reply("cannot play this meme sound, not provided");
            return;
        }
        let argsSplitted = args[0].split(" ");
        if (argsSplitted.length == 1) {
            this.playSound(messageObject, args[0]);
        } else {
            messageObject.reply("you maybe need a bit of help");
        }
    }

    //Overrided from SoundCommand
    help() {
        return `${this.prefix} ${this.keyword} => ${this.description}`;
    }

}

exports.AmbientSoundCommand = AmbientSoundCommand;