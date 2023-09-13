const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { AUTH_ERR } = require('../utils/constants');
const {
  JWT_SECRET,
  NODE_ENV,
} = require('../utils/config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;
  try {
    if (!token) {
      next(new UnauthorizedError(AUTH_ERR));
      return;
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? `${JWT_SECRET}` : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(AUTH_ERR));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
