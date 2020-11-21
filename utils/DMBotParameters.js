const config = require("../config.json");
const appMetadata = require("../package.json");

class DMBotParameters {

    constructor() {}

    static attributes() {
        return {
            config : config,
            metadata : appMetadata
        }
    }

    static generateOAuth2Invitation() {
        let endpoint = "https://discord.com/api/oauth2/authorize?";
        let client_id = "client_id=" + config.client_id;
        let permissions = "permissions=" + config.permissions_level;
        let scope = "scope=" + appMetadata.applicationScope;
        return endpoint + client_id + "&" + permissions + "&" + scope;
    }

}

exports.DMBotParameters = DMBotParameters;