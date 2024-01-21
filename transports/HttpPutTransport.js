const {HttpTransport} = require("../utils/event-router/transports");
const constants = require("../constants");

class HttpPutTransport extends HttpTransport {
    constructor() {
        super({key: constants.transports.httpPut});
    }
}

module.exports = new HttpPutTransport()