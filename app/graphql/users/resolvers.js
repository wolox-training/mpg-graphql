const { user: User } = require('../../models'),
  logger = require('../../logger'),
  errors = require('../../errors'),
  { encryptPassword } = require('../../utils/users');

exports.createNewUser = (parent, { user }) =>
  encryptPassword(user.password)
    .then(hash => {
      user.password = hash;
      return User.createModel(user);
    })
    .then(createdUser => {
      logger.info(`user ${createdUser.name} created sussccesfully`);
      return createdUser;
    })
    .catch(e => {
      logger.error(`Error creating the user ${user.name} in the database`);
      throw errors.dataBaseError(e);
    });
