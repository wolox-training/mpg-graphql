/* eslint-disable class-methods-use-this */
const { gql } = require('apollo-server'),
  { SchemaDirectiveVisitor } = require('graphql-tools'),
  { defaultFieldResolver } = require('graphql'),
  validateSchema = require('../utils/schemaValidator'),
  logger = require('../logger');

class ValidateSchemaDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { schema } = this.args;

    field.resolve = (...args) => {
      const data = { ...args[1][field.args[0].name] };
      return validateSchema(data, schema).then(() => {
        logger.info(`Schema ${schema} was validated succesfully`);
        return resolve.apply(this, args);
      });
    };
  }
}

module.exports = {
  resolvers: {
    validateSchema: ValidateSchemaDirective
  },
  schemas: gql`
    directive @validateSchema(schema: String!) on FIELD_DEFINITION
  `
};
