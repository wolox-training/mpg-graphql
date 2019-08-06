const { validateEmail, validatePassword } = require('./users');

const validationFunctions = {
  emailValidation: validateEmail,
  passwordValidation: validatePassword
};

module.exports = fnName => validationFunctions[fnName];
