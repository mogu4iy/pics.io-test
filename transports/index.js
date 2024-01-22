const HttpPostTransport = require('./HttpPostTransport');
const HttpPutTransport = require('./HttpPutTransport');
const ConsoleWarnTransport = require('./ConsoleWarnTransport');
const ConsoleLogTransport = require('./ConsoleLogTransport');
const constants = require('../constants');

function resolveTransport(transport) {
    switch (transport) {
        case constants.transports.consoleLog:
            return ConsoleLogTransport;
        case constants.transports.consoleWarn:
            return ConsoleWarnTransport;
        case constants.transports.httpPut:
            return HttpPutTransport;
        case constants.transports.httpPost:
            return HttpPostTransport;
        default:
            throw new Error(`Transport '${transport}' is not supported`);
    }
}

module.exports = {
    HttpPostTransport,
    HttpPutTransport,
    ConsoleWarnTransport,
    ConsoleLogTransport,
    resolveTransport,
};
