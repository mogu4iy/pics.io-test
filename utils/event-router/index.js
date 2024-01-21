const transports = require("./transports");
const constants = require("../../constants");
const {resolveTransport} = require("../../transports");

function resolveDestinations(possibleDestinations, strategy){
    const dest = {}
    for(const destinations of possibleDestinations) {
        for (const d in destinations){
            if (!(d in constants.destinations)){
                // TODO: log UnknownDestinationError (d)
                continue
            }
            if (!dest[d]){
                dest[d] = []
            }
            dest[d].append(destinations[d])
        }
    }
    switch (strategy){
        case constants.strategy.all:
            return Object.fromEntries(Object.entries(dest).filter((_, value) => value.every(el => el)))
        case constants.strategy.any:
            return Object.fromEntries(Object.entries(dest).filter((_, value) => value.some(el => el)))
        default:
            const func = new Function("return " + strategy)();
            return Object.keys(dest).filter((key) => func(key)).reduce((prev, key) => ({
                ...prev,
                [key]: true
            }))
    }
}

function route ({transport, possibleDestinations, payload}) {
    const resolvedDestinations = resolveDestinations(possibleDestinations)
    for (const d in resolvedDestinations) {
        if (resolvedDestinations[d]){
            const resolvedTransport = resolveTransport(transport)
            resolvedTransport.route(payload)
        }
    }
    return resolvedDestinations
}

module.exports = {
    ...transports,
    route
}