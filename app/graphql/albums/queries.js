const { gql } = require('apollo-server'),
  { getAlbum, getPhotos } = require('./resolvers');

module.exports = {
  queries: {
    album: getAlbum
  },
  fieldsQueries: {
    photos: getPhotos,
    artist: parent => parent.userId
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album!
    }
  `
};
