const bcrypt = require('bcrypt');
const { config } = require('../../../providers');
const { User } = require('../../../models');
const jwtService = require('./jwt.service');
const { ErrorBadRequest } = require('../../../utils/errors');

const saltRounds = config.get('user.passwordSaltRounds');

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function comparePasswords(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
}

async function createUser({ name, password }) {
    const user = await findUser({ name });
    if (user) {
        throw new ErrorBadRequest('User already exist');
    }

    const passwordHash = await hashPassword(password);
    const newUser = new User({ name, password: passwordHash });
    await newUser.save();

    return newUser;
}

async function findUser({ name }) {
    return await User.findOne({ name }).exec();
}

async function createAuthToken({ id }) {
    return await jwtService.signData({ id });
}

module.exports = {
    createUser,
    findUser,
    comparePasswords,
    createAuthToken,
};
