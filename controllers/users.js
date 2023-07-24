const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictRequestError = require('../errors/ConflictRequestError');
const BadRequestError = require('../errors/BadRequestError');
const {
  USER_NOT_FOUND,
  INCORRECT_DATA_SENT,
  USER_EXISTS,
  SUCCESS_LOGOUT,
  SUCCESS_AUTH,
} = require('../utils/constants');
const {
  JWT_SECRET,
  NODE_ENV,
} = require('../utils/config');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? `${JWT_SECRET}` : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.send({ message: SUCCESS_AUTH });
    })
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) return res.send({ user });
      throw new NotFoundError(USER_NOT_FOUND);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { _id } = user;
      res.status(201).send({
        email, name, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_SENT));
      }
      if (err.code === 11000) {
        next(new ConflictRequestError(USER_EXISTS));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_SENT));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictRequestError(USER_EXISTS));
        return;
      }
      next(err);
    });
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: SUCCESS_LOGOUT });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  login,
  getCurrentUser,
  logout,
};
