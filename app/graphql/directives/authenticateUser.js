const { SchemaDirectiveVisitor } = require('graphql-tools'),
  { defaultFieldResolver } = require('graphql'),
  { validateToken } = require('../../utils/token'),
  { findUserByEmail } = require('../../services/users'),
  errors = require('../../errors'),
  logger = require('../../logger'),
  { AUTHENTICATION_ERROR_MSG } = require('../../constants/validations');

class AuthenticateUser extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = (...args) => {
      const { token } = args[2];
      if (!token) {
        logger.info('User no authenticated, token was not sent');
        throw errors.authenticationError(AUTHENTICATION_ERROR_MSG);
      }
      try {
        const decodeToken = validateToken(token);
        logger.info(`User ${decodeToken.user} will be authenticated`);
        return findUserByEmail(decodeToken.user).then(user => {
          if (!user) {
            logger.info('User no exists in database');
            throw errors.authenticationError(AUTHENTICATION_ERROR_MSG);
          }
          logger.info(`User ${user.email} authenticated successfully`);
          args[2].session = { ...user.dataValues };
          return resolve.apply(this, args);
        });
      } catch (err) {
        const error = err.name === 'JsonWebTokenError' ? 'Invalid token' : err.name;
        logger.info(error);
        throw errors.authenticationError(AUTHENTICATION_ERROR_MSG);
      }
    };
  }
}

module.exports = AuthenticateUser;
