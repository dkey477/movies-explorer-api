const REGEX_URL = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;

const USER_NOT_FOUND = 'Пользователь не найден.';
const INCORRECT_DATA_SENT = 'Переданы некорректные данные.';
const USER_EXISTS = 'Пользователь уже существует.';
const SUCCESS_LOGOUT = 'Осуществлен выход';
const SUCCESS_AUTH = 'Авторизация прошла успешно';
const PAGE_NOT_FOUND = 'Страница не найдена';
const AUTH_ERR = 'Авторизуйтесь';

const MOVIE_NOT_FOUND = 'Такаого фильма не найдено';
const DELETED_MOVIE_REFUSAL = 'Такого фильма не найдено';
const DELETED_MOVIE_DONE = 'Выполено';

const LINK_VALIDATOR = 'Неккоректная ссылка';

module.exports = {
  REGEX_URL,
  LINK_VALIDATOR,
  USER_NOT_FOUND,
  INCORRECT_DATA_SENT,
  USER_EXISTS,
  SUCCESS_LOGOUT,
  SUCCESS_AUTH,
  PAGE_NOT_FOUND,
  AUTH_ERR,
  MOVIE_NOT_FOUND,
  DELETED_MOVIE_REFUSAL,
  DELETED_MOVIE_DONE,
};
