const {ConsoleTransport} = require("../utils/event-router/transports");
const constants = require("../constants");

class ConsoleWarnTransport extends ConsoleTransport {
    constructor() {
        super({key: constants.transports.consoleWarn});
    }
}

module.exports = new ConsoleWarnTransport()