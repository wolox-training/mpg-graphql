const yup = require('yup'),
  { validateEmail, validatePassword } = require('../utils/users');

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .test('Email validation', 'Email is not valid', validateEmail)
    .required(),
  password: yup
    .string()
    .required()
    .test('Password validation', 'Password is not valid', validatePassword)
});

module.exports = signUpSchema;
