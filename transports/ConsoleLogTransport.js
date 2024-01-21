const { ConsoleTransport} = require("../utils/event-router/transports");
const constants = require("../constants");

class ConsoleLogTransport extends ConsoleTransport {
    constructor() {
        super({key: constants.transports.consoleLog});
    }
}

module.exports = new ConsoleLogTransport()