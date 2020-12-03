const Command = require('../Command.js');

class RollDiceCommand extends Command.Command {

    static #DICE_TOKEN = "d";
    static #DICE_POSSIBILITIES = ["2", "3", "4", "6", "8", "10", "12", "20", "100", "1000"];
    static #OPERATORS = ["x", "p", "-", "/"];

    constructor(prefix) {
        super(prefix, "roll", `Roll as many dice as desired | example : ${prefix} roll 2d8 + 1d6 + 14 - 4`);
    }

    parseArguments(messageContent) {
        const SEPARATOR = "<s>";
        let mapper = letter => letter == "*" || letter == "x" ? "x" : letter == "+" ? "p" : letter;
        let args = messageContent.replace(this.commandIdentity(), "")
            .replace(/ /g, "")
            .split("")
            .map(mapper)
            .join("")
            .toLowerCase();
        RollDiceCommand.#OPERATORS.forEach(operator => args = args.replace(new RegExp(operator, "g"), `${SEPARATOR}${operator}${SEPARATOR}`));
        return args.split(SEPARATOR);
    }

    // Overrided from Command
    execute(messageObject, ...args) {
        const ERROR_PATTERN = "&&";
        if (!args[0]) {
            messageObject.channel.send(`I cannot calculate this expression`);
            return;
        }
        let resString = "";
        let splittedArgs = args[0];

        let mapper = valueExpression => {
            const toInt = stringInt => {
                try {
                    return parseInt(stringInt);
                } catch (error) {
                    return NaN;
                }
            };
            if (valueExpression.includes(RollDiceCommand.#DICE_TOKEN)) { // It's a dice expression
                let splittedExpression = valueExpression.split(RollDiceCommand.#DICE_TOKEN);
                let diceCount = toInt(splittedExpression[0]);
                let diceValue = toInt(splittedExpression[1]);
                if (!RollDiceCommand.#DICE_POSSIBILITIES.includes(diceValue.toString())) throw new RangeError("Cannot use this kind of dice");
                let rolledDiceValueExpression = 0;
                let resRollDiceValues = [];
                for (var i = 0; i < diceCount; i++) {
                    let rolledDiceValue = RollDiceCommand.#rollDiceOnce(diceValue);
                    resRollDiceValues.push(rolledDiceValue.toString());
                    rolledDiceValueExpression += rolledDiceValue;
                }
                resString += `${diceCount}d${diceValue} [ ${resRollDiceValues.join("+")} ] `;
                return rolledDiceValueExpression.toString();
            } else if (valueExpression.length === 1 && RollDiceCommand.#OPERATORS.includes(valueExpression)) { // It's an operator
                if (valueExpression == "x") {
                    resString += "x ";
                    return "*";
                } else if (valueExpression == "p") {
                    resString += "+ ";
                    return "+";
                }
                resString += `${valueExpression} `;
                return valueExpression;
            } else if (!isNaN(toInt(valueExpression))) { // It's an integer
                resString += `${valueExpression} `;
                return valueExpression;
            } else {
                return ERROR_PATTERN;
            }
        };

        let resValueString = splittedArgs.map(mapper).join("");

        if (resValueString.includes(ERROR_PATTERN)) {
            messageObject.channel.send(`I cannot calculate this expression because illegal characters are not allowed`);
            return;
        }

        try {
            let resValue = eval(resValueString);
            messageObject.channel.send(`:game_die: Dice rolled : ${resString} = **${resValue}**`);
        } catch (error) {
            messageObject.channel.send(`I cannot calculate this expression because illegal characters are not allowed`);
            return;
        }
    }

    //Overrided from Command
    help() {
        return `${this.prefix} ${this.keyword} => ${this.description}`;
    }

    static #rollDiceOnce = (diceValue) => Math.ceil(Math.random() * (diceValue - 1)) + 1;

}

exports.RollDiceCommand = RollDiceCommand;