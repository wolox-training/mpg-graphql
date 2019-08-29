const { gql } = require('apollo-server');

module.exports = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
`;
