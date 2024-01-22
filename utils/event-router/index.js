const transports = require('./transports');
const constants = require('../../constants');
const { logger } = require('../../providers');

function resolveDestinations(possibleDestinations, strategy) {
    const unknownDest = new Set();
    const dest = {};
    for (const destinations of possibleDestinations) {
        for (const d in destinations) {
            if (!constants.destinations.includes(d)) {
                unknownDest.add([d, false]);
                continue;
            }
            if (!dest[d]) {
                dest[d] = [];
            }
            dest[d].push(destinations[d]);
        }
    }
    for (const ud of unknownDest) {
        logger.error(`resolveDestinations: UnknownDestinationError (${ud[0]})`);
    }
    switch (strategy) {
        case constants.strategy.all:
            return Object.fromEntries(
                Object.entries(dest)
                    .map(([key, value]) => [key, value.every(el => el)])
                    .concat(Array.from(unknownDest)),
            );
        case constants.strategy.any:
            return Object.fromEntries(
                Object.entries(dest)
                    .map(([key, value]) => [key, value.some(el => el)])
                    .concat(Array.from(unknownDest)),
            );
        default:
            const func = new Function('return ' + strategy)();
            return Object.fromEntries(
                Object.keys(dest)
                    .map(key => [key, func(key)])
                    .concat(Array.from(unknownDest)),
            );
    }
}

module.exports = {
    ...transports,
    resolveDestinations,
};
