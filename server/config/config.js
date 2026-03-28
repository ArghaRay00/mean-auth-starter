if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config({ path: __dirname + '/../.env' });
  } catch {
    // dotenv not installed or .env not found — fall back to config.json
    var config = require('./config.json');
    var envConfig = config[process.env.NODE_ENV || 'development'];
    Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
  }
}
