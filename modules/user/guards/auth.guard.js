const { httpMiddleware } = require('../../../utils/handler');
const { jwtService } = require('../services');
const { ErrorUnauthorized } = require('../../../utils/errors');

async function authGuard(req, res, next) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer') {
        throw new ErrorUnauthorized('Authorization header is invalid');
    }
    req.user = await jwtService.verifyData(token);
    return next();
}

module.exports = httpMiddleware(authGuard);
