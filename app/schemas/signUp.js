const yup = require('yup'),
  { validateEmail, validatePassword } = require('../utils/users'),
  {
    EMAIL_VALIDATION_MSG,
    EMAIL_VALIDATION_ERROR,
    PASSWORD_VALIDATION_MSG,
    PASSWORD_VALIDATION_ERROR
  } = require('../constants/validations');

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .test(EMAIL_VALIDATION_MSG, EMAIL_VALIDATION_ERROR, validateEmail)
    .required(),
  password: yup
    .string()
    .required()
    .test(PASSWORD_VALIDATION_MSG, PASSWORD_VALIDATION_ERROR, validatePassword)
});

module.exports = signUpSchema;
