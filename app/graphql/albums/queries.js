const { gql } = require('apollo-server'),
  { getAlbum, getPhotos, albumsList } = require('./resolvers'),
  { DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_ORDER_BY } = require('../../constants/defaultValues');

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
      albums(offset: Int = ${DEFAULT_OFFSET}, 
             limit: Int = ${DEFAULT_LIMIT}, 
             orderBy: AlbumFields = "${DEFAULT_ORDER_BY}", 
             filter: String): [Album!]!
    }
  `
};
