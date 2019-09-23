const { gql } = require('apollo-server');

module.exports = gql`
  enum AlbumFields {
    title
    artist
    id
  }
`;
