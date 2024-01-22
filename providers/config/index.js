const process = require('node:process');
const path = require('node:path');
process.env['NODE_CONFIG_DIR'] = path.join(process.cwd(), './configs');
const config = require('config');
module.exports = config;
