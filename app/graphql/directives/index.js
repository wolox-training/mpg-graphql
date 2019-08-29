/* eslint-disable class-methods-use-this */
const { gql } = require('apollo-server'),
  validateSchemaDirective = require('./validateSchema'),
  authenticateUser = require('./authenticateUser');

module.exports = {
  resolvers: {
    validateSchema: validateSchemaDirective,
    authentication: authenticateUser
  },
  schemas: gql`
    directive @validateSchema(schema: String!) on FIELD_DEFINITION
    directive @authentication on FIELD_DEFINITION
    directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE
  `
};
