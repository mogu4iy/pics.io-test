const eventRouterService = require("../services/eventRouter.service");

function eventRouteController(req, res) {
    try {
        const resolvedDestinations = eventRouterService.route({
            strategy: req.body.strategy,
            possibleDestinations: req.body.possibleDestinations,
            payload: req.body.payload
        })
        return res.send(resolvedDestinations)
    } catch (e) {
        console.log(e)
        // TODO: log error
    }
}

module.exports = eventRouteController