const bcrypt = require('bcryptjs'),
  errors = require('../errors'),
  logger = require('../logger');

const rounds = 10;

exports.encryptPassword = password =>
  bcrypt.hash(password, rounds).catch(err => {
    logger.error(err.message);
    throw errors.hashError('Error hashing password');
  });

exports.validateEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
  (email.split('@')[1] === 'wolox.co' || email.split('@')[1] === 'wolox.com.ar');

exports.validatePassword = password => /^[a-z0-9]+$/i.test(password) && password.length >= 8;

exports.comparePassword = (password, hash) =>
  bcrypt.compare(password, hash).catch(err => {
    logger.error(err.message);
    throw errors.userSigninError('Invalid password');
  });
