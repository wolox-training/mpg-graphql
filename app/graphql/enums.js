const { gql } = require('apollo-server');

module.exports = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
  enum AlbumFields {
    title
    artist
    id
  }
`;
