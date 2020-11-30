const SoundCommand = require('../SoundCommand.js');
const path = require('path');

class MusicSoundCommand extends SoundCommand.SoundCommand {

    constructor(prefix) {
        super(prefix, "music", `Launch an music to the current voice channel | example : ${prefix} music epic-battle`, path.join(__dirname, "../../static/sound/music"));
    }

    // Overrided from SoundCommand
    execute(messageObject, ...args) {
        if (!args) {
            messageObject.reply("cannot play this music, not provided");
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

exports.MusicSoundCommand = MusicSoundCommand;