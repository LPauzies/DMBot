const path = require('path');
const fs = require('fs');

const Command = require('./../Command.js');
const NotInVoiceChannelError = require("./../../utils/errors/NotInVoiceChannelError.js");
const NotAvailableVoiceChannelError = require("./../../utils/errors/NotAvailableVoiceChannelError.js");
const DMBotParameters = require("./../../utils/DMBotParameters.js");

class StopSoundCommand extends Command.Command {

    constructor(prefix) {
        super(prefix, "stop", "Stop any sound playing in voice channel");
    }

    execute(messageObject, ...args) {
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

            if (!voiceChannel.joinable) {
                messageObject.reply("cannot connect to a not joinable voice channel :x:");
                throw new NotInVoiceChannelError.NotInVoiceChannelError("Cannot connect to a not joinable voice channel");
            }
            if (!isAlreadyUsed) {
                messageObject.reply("not connected to this voice channel :x:")
                throw new NotAvailableVoiceChannelError.NotAvailableVoiceChannelError("Not connected to this voice channel");
            }

            voiceChannel.leave();
        }
    }

    //Overrided from Command
    help() {
        return `${this.prefix} ${this.keyword} => ${this.description}`;
    }

}

exports.StopSoundCommand = StopSoundCommand;