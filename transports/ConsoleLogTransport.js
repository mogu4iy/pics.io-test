const { ConsoleTransport } = require('../utils/event-router/transports');
const constants = require('../constants');

class ConsoleLogTransport extends ConsoleTransport {
    async route(payload) {
        console.log(JSON.stringify(payload, null, 2));
    }

    constructor() {
        super({ key: constants.transports.consoleLog });
    }
}

module.exports = new ConsoleLogTransport();
