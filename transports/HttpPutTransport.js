const {HttpTransport} = require("../utils/event-router/transports");
const constants = require("../constants");
const axios = require("axios");

class HttpPutTransport extends HttpTransport {
    async route(payload, meta) {
        axios.put(meta.url, payload)
            .then(() => {
                // TODO: log result
            })
            .catch(() => {
                // TODO: log error
            })
    }
    constructor() {
        super({key: constants.transports.httpPut});
    }
}

module.exports = new HttpPutTransport()