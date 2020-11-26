const path = require('path');
const fs = require('fs');

const Command = require('./Command.js');
const SoundNotFoundError = require("./../utils/errors/SoundNotFoundError.js");
const NotInVoiceChannelError = require("./../utils/errors/NotInVoiceChannelError.js");
const NotAvailableVoiceChannelError = require("./../utils/errors/NotAvailableVoiceChannelError.js");
const DMBotParameters = require("./../utils/DMBotParameters.js");

class SoundCommand extends Command.Command {

    constructor(prefix, keyword, description, soundFolderPath) {
        super(prefix, keyword, description);
        this.soundFolderPath = soundFolderPath;
        this.soundsAvailables = [];
        this.#listAvailableSounds();
    }

    parseArguments(messageContent) {
        return messageContent.replace(this.commandIdentity(), "")
                             .trim()
                             .toLowerCase();
    }

    playSound(messageObject, soundName) {
        console.log(this.soundsAvailables);
        const voiceChannel = messageObject.member.voice.channel;
        // Check if voice channel exist for the member who tell to the bot
        if (voiceChannel) {
            // Check if the bot is connected to a voice channel
            let isAlreadyUsed = false;
            let membersInChannel = voiceChannel.members.array();
            const finder = role => role.name == DMBotParameters.DMBotParameters.config.botConfig.role;
            for (const member of membersInChannel) {
                if (member.user.bot && member.roles.cache.find(finder)) {
                    isAlreadyUsed = true;
                    break;
                }
            }
            if (isAlreadyUsed) {
                messageObject.reply("already playing sound in voice channel");
                throw new NotAvailableVoiceChannelError.NotAvailableVoiceChannelError("Already connected to this voice channel");
            }

            if (!voiceChannel.joinable) {
                messageObject.reply("cannot join this channel");
                throw new NotInVoiceChannelError.NotInVoiceChannelError("Cannot connect to a not joinable voice channel");
            }

            let soundPath = path.join(this.soundFolderPath, `${soundName}.mp3`);
            // Check if the sound file exists
            if (fs.existsSync(soundPath)) {
                voiceChannel.join()
                            .then(voiceConnection => {
                                voiceConnection.play(soundPath)
                                               .on("finish", () => voiceChannel.leave())
                            })
                            .catch(error => {
                                messageObject.reply("cannot join this channel");
                                throw error;
                            });
            } else {
                messageObject.reply("cannot find this sound");
                throw new SoundNotFoundError.SoundNotFoundError("This sound does not exist");
            }
        }
    }

    #listAvailableSounds() {
        fs.readdir(this.soundFolderPath, (err, files) => {
            files.forEach(file => {
                if (file.endsWith(".mp3"))  this.soundsAvailables.push(file.split(".")[0]);
            })
        })
    }

}

exports.SoundCommand = SoundCommand;