// Write a class to create logs and store them in files for each day
// Keep an history of 2 weeks
const path = require('path');
const fs = require('fs');

class DMBotLogger {

    static #LOG_DIRECTORY = path.join(__dirname, "../../logs");
    static #LOG_LEVEL = {
        INFO : "Info",
        WARNING : "Warning",
        EXCEPTION : "Exception"
    };

    static info(message) {
        let log = DMBotLogger.#generateLog(DMBotLogger.#LOG_LEVEL.INFO, message);
        let pathLog = DMBotLogger.#getOrCreateLogFile();
        fs.writeFile(pathLog, log, { flag : "a" }, err => {
            if (err) console.log("Error while writing the info log to " + pathLog);
        });
    }

    static warning(message) {
        let log = DMBotLogger.#generateLog(DMBotLogger.#LOG_LEVEL.WARNING, message);
        let pathLog = DMBotLogger.#getOrCreateLogFile();
        fs.writeFile(pathLog, log, { flag : "a" }, err => {
            if (err) console.log("Error while writing the warning log to " + pathLog);
        });
    }

    static exception(message, exception) {
        let log = DMBotLogger.#generateLog(DMBotLogger.#LOG_LEVEL.EXCEPTION, message) + "\n" + exception.stack;
        let pathLog = DMBotLogger.#getOrCreateLogFile();
        fs.writeFile(pathLog, log, { flag : "a" }, err => {
            if (err) console.log("Error while writing the exception log to " + pathLog);
        });
    }

    static #getOrCreateLogFile() {
        return path.join(DMBotLogger.#LOG_DIRECTORY, DMBotLogger.#generateTodayFileName());
    }

    static #generateLog(logLevel, message) {
        let today = new Date().toISOString().split('T')[1].split(".")[0];
        let log = "[" + today + "] " + logLevel + ": " + message;
        console.log(log);
        return "\n" + log;
    }

    static #generateTodayFileName() {
        return "DMBot-" + new Date().toISOString().split("T")[0] + ".log";
    }

}

exports.DMBotLogger = DMBotLogger;