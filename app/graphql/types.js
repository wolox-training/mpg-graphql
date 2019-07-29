const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    id: ID!
  }
  type AccessToken {
    accessToken: String!
    refreshToken: String!
    expiresIn: Int!
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
