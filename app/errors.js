const { ApolloError, UserInputError, AuthenticationError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const DEFAULT_ERROR = 500,
  BAD_REQUEST = 400,
  HASH_ERROR = 500,
  EXTERNAL_API_ERROR = 500,
  DATABASE_ERROR = 503,
  INVALID_EMAIL = 409,
  USER_SIGNIN_ERROR = 401,
  ALBUM_BUY_ERROR = 409;

exports.defaultError = message => createError(message, DEFAULT_ERROR);
exports.badRequest = message => createError(message, BAD_REQUEST);
exports.hashError = message => createError(message, HASH_ERROR);
exports.dataBaseError = message => createError(message, DATABASE_ERROR);
exports.externalApiError = message => createError(message, EXTERNAL_API_ERROR);
exports.invalidEmail = message => createError(message, INVALID_EMAIL);
exports.inputError = (message, invalidArgs) => new UserInputError(message, { invalidArgs });
exports.userSigninError = message => createError(message, USER_SIGNIN_ERROR);
exports.authenticationError = message => new AuthenticationError(message);
exports.albumBuyError = message => createError(message, ALBUM_BUY_ERROR);
