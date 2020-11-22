const NotImplementedError = require("./../utils/errors/NotImplementedError.js");

class Command {

    // A command is typed with !dm keyword
    constructor(prefix, keyword, description) {
        if (this.constructor === Command) throw new TypeError("Abstract class \"Command\" cannot be directly instantiated");
        this.prefix = prefix;
        this.keyword = keyword;
        this.description = description;
    }

    commandIdentity() {
        return `${this.prefix} ${this.keyword}`;
    }

    execute(messageObject, ...commandArgs) {
        throw new NotImplementedError.NotImplementedError("Method \"execute\" not yet implemented");
    }

    help() {
        throw new NotImplementedError.NotImplementedError("Method \"help\" not yet implemented");
    }

}

exports.Command = Command;