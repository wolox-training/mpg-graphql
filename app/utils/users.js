const bcrypt = require('bcryptjs'),
  errors = require('../errors'),
  logger = require('../logger');

const rounds = 10;

exports.encryptPassword = password =>
  bcrypt.hash(password, rounds).catch(err => {
    logger.error(err.message);
    throw errors.hashError('Error hashing password');
  });
