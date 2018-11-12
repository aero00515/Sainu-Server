const devConfig = require('./dev.conf.json');
const prodConfig = require('./prod.conf.json');

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
module.exports = config;
