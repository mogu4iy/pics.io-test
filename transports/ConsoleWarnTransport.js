const {ConsoleTransport} = require("../utils/event-router/transports");
const constants = require("../constants");

class ConsoleWarnTransport extends ConsoleTransport {
    async route(payload) {
        console.warn(JSON.stringify(payload, null, 2))
    }

    constructor() {
        super({key: constants.transports.consoleWarn});
    }
}

module.exports = new ConsoleWarnTransport()