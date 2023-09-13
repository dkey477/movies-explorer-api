const rateLimit = require('express-rate-limit');

const RATE_LIMIT = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standartHeaders: true,
  legacyHeaders: false,
});

const { MDB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;
const { PORT = 3000 } = process.env;

module.exports = {
  MDB,
  NODE_ENV,
  PORT,
  JWT_SECRET,
  RATE_LIMIT,
};
