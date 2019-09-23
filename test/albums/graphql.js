const { gql } = require('apollo-server');

const album = id => gql`
  query {
    album(id: ${id}) {
      title
      artist
      photos {
        title
      }
      id
    }
  }`;

const albums = (offset = 0, limit = 3, orderBy = 'id') => gql`
  query {
    albums(offset: ${offset}, limit: ${limit}, orderBy: "${orderBy}") {
      title
      artist
      photos {
        title
      }
      id
    }
  }
`;

const buyAlbum = albumId => ({
  mutation: gql`
    mutation buyAlbum($albumId: ID!) {
      buyAlbum(albumId: $albumId) {
        title
        artist
        photos {
          title
        }
        id
      }
    }
  `,
  variables: { albumId }
});

module.exports = { album, albums, buyAlbum };
