const errors = require('../errors'),
  { user } = require('../models'),
  logger = require('../logger');

exports.findUserByEmail = email =>
  user
    .findOne({
      where: {
        email
      }
    })
    .catch(err => {
      logger.error(err.message);
      throw errors.dataBaseError('Error finding email in database');
    });
