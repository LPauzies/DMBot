const config = require("../config.json");
const appMetadata = require("../package.json");

class DMBotParameters {

    // Represents data from the bot seen in https://discord.com/developers/applications
    // Available to be modified externally case of token changing through GUI
    static config = config;
    static metadata = appMetadata;

    static generateOAuth2Invitation() {
        let endpoint = "https://discord.com/api/oauth2/authorize?";
        let client_id = "client_id=" + DMBotParameters.config.client_id;
        let permissions = "permissions=" + DMBotParameters.config.permissions_level;
        let scope = "scope=" + DMBotParameters.metadata.applicationScope;
        return endpoint + client_id + "&" + permissions + "&" + scope;
    }

}

exports.DMBotParameters = DMBotParameters;