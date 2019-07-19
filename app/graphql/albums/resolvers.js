const { findAlbumById, findPhotosByAlbumId, findAlbums } = require('../../services/albums'),
  { orderArrayByField, filterArrayByField } = require('../../utils/arrays');

exports.getAlbum = (parent, params) => findAlbumById(params.id);
exports.getPhotos = parent => findPhotosByAlbumId(parent.id);
exports.albumsList = async (parent, params) => {
  let albumsProcessed = [];
  const { limit, offset, orderBy, filter } = params;
  const albums = await findAlbums();
  if (filter) {
    albumsProcessed = filterArrayByField(albums, 'title', filter);
  } else {
    albumsProcessed = albums;
  }
  return orderArrayByField(albumsProcessed.slice(offset, offset + limit), orderBy);
};
