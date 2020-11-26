class NotInVoiceChannelError extends Error {

    constructor(message) {
        super(message);
    }

}

exports.NotInVoiceChannelError = NotInVoiceChannelError;