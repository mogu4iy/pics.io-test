const {resolveTransport} = require("../../../transports");
const {resolveDestinations} = require("../../../utils/event-router");
const {config} = require("../../../providers");

function route({strategy, possibleDestinations, payload}) {
    const resolvedDestinations = resolveDestinations(possibleDestinations, strategy)
    for (const d in resolvedDestinations) {
        if (resolvedDestinations[d]) {
            const destinationConfig = config.get(`routes.${d}`)
            // TODO: check if config exists
            const resolvedTransport = resolveTransport(destinationConfig.transport)
            resolvedTransport.route(payload, destinationConfig)
        }
    }
    return resolvedDestinations
}

module.exports = {
    route
}