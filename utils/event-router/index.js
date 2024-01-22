const transports = require("./transports");
const constants = require("../../constants");

function resolveDestinations(possibleDestinations, strategy){
    const unknownDest = []
    const dest = {}
    for(const destinations of possibleDestinations) {
        for (const d in destinations){
            if (!constants.destinations.includes(d)){
                unknownDest.push([d, false])
                // TODO: log UnknownDestinationError (d)
                continue
            }
            if (!dest[d]){
                dest[d] = []
            }
            dest[d].push(destinations[d])
        }
    }
    switch (strategy){
        case constants.strategy.all:
            return Object.fromEntries(Object.entries(dest).map(([key, value]) => [key, value.every(el => el)]).concat(unknownDest))
        case constants.strategy.any:
            return Object.fromEntries(Object.entries(dest).map(([key, value]) => [key, value.some(el => el)]).concat(unknownDest))
        default:
            const func = new Function("return " + strategy)();
            return Object.fromEntries(Object.keys(dest).map((key) => [key, func(key)]).concat(unknownDest))
    }
}


module.exports = {
    ...transports,
    resolveDestinations
}