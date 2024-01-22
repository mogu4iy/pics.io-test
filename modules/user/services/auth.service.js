const userService = require('./user.service');
const { ErrorBadRequest, ErrorUnauthorized } = require('../../../utils/errors');

async function login({ name, password }) {
    const user = await userService.findUser({ name });
    if (!user) {
        throw new ErrorBadRequest('User does not exist');
    }
    const passwordCompared = await userService.comparePasswords(password, user.password);
    if (!passwordCompared) {
        throw new ErrorUnauthorized('Password is wrong');
    }
    return await userService.createAuthToken({ id: user._id });
}

async function register({ name, password }) {
    await userService.createUser({ name, password });
    return await userService.createAuthToken({ name });
}

module.exports = {
    login,
    register,
};
