"use strict";

// npm libs requirements
const Discord = require('discord.js');
// DMBot utilities requirements
const DMBotParameters = require("./utils/DMBotParameters.js");
const DMBotLogger =  require("./utils/logger/DMBotLogger.js");
// DMBot commands requirements
const PingCommand = require("./commands/commands/PingCommand.js");
const InviteCommand = require("./commands/commands/InviteCommand.js");
const RollDiceCommand = require("./commands/commands/RollDiceCommand.js");
const LuckRollDiceCommand = require("./commands/commands/LuckRollDiceCommand.js");

const DMBotClient = new Discord.Client();

const prefix = DMBotParameters.DMBotParameters.config.botConfig.prefix;

//Commands declaration of the bot
const pingCommand = new PingCommand.PingCommand(prefix);
const inviteCommand = new InviteCommand.InviteCommand(prefix);
const rollDiceCommand = new RollDiceCommand.RollDiceCommand(prefix);
const luckRollDiceCommand = new LuckRollDiceCommand.LuckRollDiceCommand(prefix);

DMBotClient.on("ready", () => {
    DMBotLogger.DMBotLogger.info(`Connected as ${DMBotClient.user.tag}` );
    DMBotClient.user.setActivity("PCs playing", { type : "WATCHING" });
    for (const guild of DMBotClient.guilds.cache.values()) {
        if (guild.available) DMBotLogger.DMBotLogger.info(`Logged in and available to "${guild.name}" with id ${guild.id}`);
    }
});

DMBotClient.on("message", message => {
    try {
        if (message.content.startsWith(pingCommand.commandIdentity())) pingCommand.execute(message);
        if (message.content.startsWith(inviteCommand.commandIdentity())) inviteCommand.execute(message, DMBotParameters.DMBotParameters.generateOAuth2Invitation());
        if (message.content.startsWith(rollDiceCommand.commandIdentity())) rollDiceCommand.execute(message, rollDiceCommand.parseArguments(message.content));
        if (message.content.startsWith(luckRollDiceCommand.commandIdentity())) luckRollDiceCommand.execute(message);
    } catch (error) {
        DMBotLogger.DMBotLogger.exception("Something wrong happened during message event", error);
    }
});

DMBotClient
    .login(DMBotParameters.DMBotParameters.config.token)
    .then(() => DMBotLogger.DMBotLogger.info("Logged successfully using Discord token"))
    .catch((err) => DMBotLogger.DMBotLogger.exception("Cannot logged using Discord token", err));