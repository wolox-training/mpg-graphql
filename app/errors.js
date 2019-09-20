const { ApolloError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const DEFAULT_ERROR = 500,
  BAD_REQUEST = 400,
  HASH_ERROR = 500,
  EXTERNAL_API_ERROR = 500,
  DATABASE_ERROR = 503;

exports.defaultError = message => createError(message, DEFAULT_ERROR);
exports.badRequest = message => createError(message, BAD_REQUEST);
exports.hashError = message => createError(message, HASH_ERROR);
exports.dataBaseError = message => createError(message, DATABASE_ERROR);
exports.externalApiError = message => createError(message, EXTERNAL_API_ERROR);
