const { gql } = require('apollo-server'),
  { buyAlbumById } = require('./resolvers');

module.exports = {
  mutations: {
    buyAlbum: buyAlbumById
  },
  schema: gql`
    extend type Mutation {
      buyAlbum(albumId: ID!): Album! @authentication @validateSchema(schema: "buyAlbum")
    }
  `
};
