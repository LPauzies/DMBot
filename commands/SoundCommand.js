const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core-discord');

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
        const voiceChannel = messageObject.member.voice.channel;
        // Check if voice channel exist for the member who tell to the bot
        if (voiceChannel) {
            //Check if joinable
            if (!voiceChannel.joinable) {
                messageObject.reply("cannot join this channel");
                throw new NotInVoiceChannelError.NotInVoiceChannelError("Cannot connect to a not joinable voice channel");
            }
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
                messageObject.reply("DMBot is already busy !");
                throw new NotAvailableVoiceChannelError.NotAvailableVoiceChannelError("Voice channel already busy by DMBot");
            }

            let jsonSoundPath = path.join(this.soundFolderPath, `${soundName}.json`);
            // Check if the sound file exists
            if (fs.existsSync(jsonSoundPath)) {
                let jsonSound = require(jsonSoundPath);
                voiceChannel.join()
                            .then(
                                async voiceConnection => {
                                    voiceConnection.play(await ytdl(jsonSound.link), { type : "opus" })
                                                .on("finish", () => voiceChannel.leave());
                                    messageObject.channel.send(`Currently playing **${jsonSound.name}**`);
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
                if (file.endsWith(".json"))  {
                    let json = require(path.join(this.soundFolderPath, file));
                    this.soundsAvailables.push({ name : file.split(".")[0], fullname : json.name });
                }
            })
        });
    }

    generateHelpMessage() {
        let res = `Help message for **${this.keyword}**\n---\n`;
        let maxMessageInOneLine = 5;
        let currentMessageCountInOneLine = 1;
        for (const sound of this.soundsAvailables) {
            res += `**${sound.name}** : *${sound.fullname}* `
            if (currentMessageCountInOneLine < maxMessageInOneLine) {
                res += ", ";
                currentMessageCountInOneLine++;
            } else {
                res += "\n";
                currentMessageCountInOneLine = 1;
            }
        }
        return res;
    }

}

exports.SoundCommand = SoundCommand;