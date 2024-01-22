const eventRouterService = require('../services/eventRouter.service');
const { httpHandler } = require('../../../utils/handler');

async function eventRouteController(req) {
    return eventRouterService.route({
        strategy: req.body.strategy,
        possibleDestinations: req.body.possibleDestinations,
        payload: req.body.payload,
    });
}

module.exports = httpHandler(eventRouteController);
