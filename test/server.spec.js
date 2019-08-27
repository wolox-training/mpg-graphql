const { createTestClient } = require('apollo-server-testing'),
  { ApolloServer } = require('apollo-server'),
  schema = require('../app/graphql');

const testServer = (context = {}) => {
  const server = new ApolloServer({
    schema,
    context
  });
  const { query: _query, mutate } = createTestClient(server);
  const query = params => _query({ query: params });
  return { query, mutate };
};

module.exports = testServer;
