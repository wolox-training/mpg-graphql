const { makeExecutableSchema } = require('graphql-tools'),
  types = require('./types'),
  inputs = require('./inputs'),
  directives = require('./directives'),
  enums = require('./enums'),
  users = require('./users'),
  healthCheck = require('./healthCheck'),
  albums = require('./albums');

const typeDefs = [
  types,
  inputs,
  enums,
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
      ...users.mutations
    },
    Subscription: {
      ...users.subscriptions
    },
    Album: {
      ...albums.fieldsQueries
    }
  },
  schemaDirectives: {
    ...directives.resolvers
  }
});
