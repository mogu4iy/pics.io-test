const util = require('node:util');
const jwt = require('jsonwebtoken');
const { config } = require('../../../providers');

const expiresIn = config.get('user.jwtExpiresIn');
const algorithm = config.get('user.jwtAlgorithm');
const privateKey = config.get('user.jwtPrivateKey');
const publicKey = config.get('user.jwtPublicKey');

const jwtSignAsync = util.promisify(jwt.sign);
const jwtVerifyAsync = util.promisify(jwt.verify);

function signData(data) {
    return jwtSignAsync(data, privateKey, { expiresIn, algorithm });
}

function verifyData(token) {
    return jwtVerifyAsync(token, publicKey, { algorithms: [algorithm] });
}

module.exports = {
    signData,
    verifyData,
};
