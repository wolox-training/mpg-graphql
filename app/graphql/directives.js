/* eslint-disable class-methods-use-this */
const { gql } = require('apollo-server'),
  { SchemaDirectiveVisitor } = require('graphql-tools'),
  { defaultFieldResolver } = require('graphql');

const getValidationFn = require('../utils/validationFunctions'),
  errors = require('../errors'),
  logger = require('../logger');

class ValidateInputDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { inputs } = this.args;

    field.resolve = (...args) => {
      const values = { ...args[1][field.args[0].name] };
      const fieldValidations = inputs.reduce((errs, input) => {
        const validationFn = getValidationFn(`${input}Validation`);
        const isValid = validationFn(values[input]);
        if (!isValid) {
          errs.push({ message: `${input} is not a validad input` });
        }
        return errs;
      }, []);
      if (fieldValidations.length > 0) {
        logger.error('Invalid inputs');
        return errors.inputError('Invalidad inputs', fieldValidations);
      }
      return resolve.apply(this, args);
    };
  }
}

module.exports = {
  resolvers: {
    validateInput: ValidateInputDirective
  },
  schemas: gql`
    directive @validateInput(inputs: [String]!) on FIELD_DEFINITION
  `
};
