const { gql } = require('apollo-server'),
  { getAlbum, getPhotos, albumsList } = require('./resolvers');

module.exports = {
  queries: {
    album: getAlbum,
    albums: albumsList
  },
  fieldsQueries: {
    photos: getPhotos,
    artist: parent => parent.userId
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album!
      albums(offset: Int, limit: Int, orderBy: String, filter: String): [Album!]!
    }
  `
};
