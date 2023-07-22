const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const AccessIsDeniedError = require('../errors/ConflictRequestError');
const BadRequestError = require('../errors/BadRequestError');

const {
  INCORRECT_DATA_SENT,
  MOVIE_NOT_FOUND,
  DELETED_MOVIE_REFUSAL,
  DELETED_MOVIE_DONE,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_SENT));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(MOVIE_NOT_FOUND))
    .then((moviecard) => {
      if (moviecard.owner.toString() !== req.user._id) {
        return Promise.reject(new AccessIsDeniedError(DELETED_MOVIE_REFUSAL));
      }
      return Movie.deleteOne(moviecard)
        .then(() => res.send({ message: DELETED_MOVIE_DONE }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
