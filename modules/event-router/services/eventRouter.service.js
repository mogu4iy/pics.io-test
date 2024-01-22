const { resolveTransport } = require('../../../transports');
const { resolveDestinations } = require('../../../utils/event-router');
const { destinationTransports } = require('../../../constants');

function route({ strategy, possibleDestinations, payload }) {
    const resolvedDestinations = resolveDestinations(possibleDestinations, strategy);
    for (const d in resolvedDestinations) {
        if (resolvedDestinations[d]) {
            const destinationConfig = destinationTransports[d];
            if (!destinationConfig) {
                throw new Error(`Destination (${d}) config is not resolved`);
            }
            const resolvedTransport = resolveTransport(destinationConfig.transport);
            resolvedTransport.route(payload, destinationConfig);
        }
    }
    return resolvedDestinations;
}

module.exports = {
    route,
};
