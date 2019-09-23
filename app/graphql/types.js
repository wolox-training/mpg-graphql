const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    name: String!
    lastname: String!
      @deprecated(
        reason: "Field deprecated! use name field instead. lastname field will be removed in the future"
      )
    email: String!
    password: String!
    id: ID!
  }
  type AccessToken {
    accessToken: String!
  }
  type Album {
    title: String!
    artist: String!
    photos: [Photo!]!
    id: ID!
  }
  type Photo {
    title: String!
    url: String!
    thumbnailUrl: String!
    albumId: String!
    id: ID!
  }
`;
