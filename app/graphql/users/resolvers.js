const { user: User } = require('../../models'),
  logger = require('../../logger'),
  { encryptPassword } = require('../../utils/users'),
  { userLoggedIn } = require('../events'),
  { loginUser } = require('../../interactors/users');

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
      throw e;
    });

exports.signIn = (parent, { credentials }) => {
  userLoggedIn.publish(credentials.email);
  const { email, password } = credentials;
  logger.info(`User ${email} is attempting to login`);
  return loginUser(email, password)
    .then(token => {
      logger.info(`User ${email} singed in successfully`);
      return { accessToken: token };
    })
    .catch(e => {
      logger.error(`Error login the user ${email}`);
      throw e;
    });
};
