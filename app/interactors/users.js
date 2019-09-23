const { findUserByEmail } = require('../services/users'),
  { comparePassword } = require('../utils/users'),
  logger = require('../logger'),
  errors = require('../errors'),
  { generateToken } = require('../utils/token');

exports.loginUser = (email, password) =>
  findUserByEmail(email)
    .then(user => {
      if (!user) {
        logger.error('Invalid email');
        throw errors.userSigninError('Email or password invalid');
      }
      return comparePassword(password, user.password);
    })
    .then(passwordIsValid => {
      if (!passwordIsValid) {
        logger.error('Invalid password');
        throw errors.userSigninError('Email or password invalid');
      }
      return generateToken({ user: email });
    });
