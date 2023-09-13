const mongoose = require('mongoose');
const { LINK_VALIDATOR, REGEX_URL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => REGEX_URL.test(url),
      message: LINK_VALIDATOR,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => REGEX_URL.test(url),
      message: LINK_VALIDATOR,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => REGEX_URL.test(url),
      message: LINK_VALIDATOR,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
