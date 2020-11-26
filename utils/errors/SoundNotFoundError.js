class SoundNotFoundError extends Error {

    constructor(message) {
        super(message);
    }

}

exports.SoundNotFoundError = SoundNotFoundError;