const { findAlbumById, findPhotosByAlbumId, findAlbums } = require('../../services/albums'),
  { orderArrayByField, filterArrayByField } = require('../../utils/arrays');

exports.getAlbum = (parent, params) => findAlbumById(params.id);
exports.getPhotos = parent => findPhotosByAlbumId(parent.id);
exports.albumsList = async (parent, params) => {
  const { limit = 3, offset = 0, orderBy = 'id', filter } = params;
  let albums = await findAlbums();
  if (filter) {
    albums = filterArrayByField(albums, 'title', filter);
  }
  return orderArrayByField(albums.slice(offset, offset + limit), orderBy);
};
