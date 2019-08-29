const { makeExecutableSchema } = require('graphql-tools'),
  types = require('./types'),
  inputs = require('./inputs'),
  directives = require('./directives'),
  users = require('./users'),
  healthCheck = require('./healthCheck'),
  albums = require('./albums'),
  emums = require('./enums');

const typeDefs = [
  types,
  inputs,
  emums,
  directives.schemas,
  ...users.schemas,
  ...healthCheck.schemas,
  ...albums.schemas
];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...users.queries,
      ...healthCheck.queries,
      ...albums.queries
    },
    Mutation: {
      ...users.mutations,
      ...albums.mutations
    },
    Subscription: {
      ...users.subscriptions
    },
    Album: {
      ...albums.fieldsQueries
    },
    User: {
      ...users.fieldsQueries
    }
  },
  schemaDirectives: {
    ...directives.resolvers
  }
});
