"use strict";

const Discord = require('discord.js');
const DMBotParameters = require("./utils/DMBotParameters.js");
const DMBotClient = new Discord.Client();

const parameters = DMBotParameters.DMBotParameters.attributes();

DMBotClient.login(parameters.config.token);