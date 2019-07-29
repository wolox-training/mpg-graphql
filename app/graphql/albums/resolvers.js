const { findAlbumById, findPhotosByAlbumId, findAlbums } = require('../../services/albums'),
  { orderArrayByField } = require('../../utils/arrays');

exports.getAlbum = (parent, params) => findAlbumById(params.id);
exports.getPhotos = parent => findPhotosByAlbumId(parent.id);
exports.albumsList = async (parent, params) => {
  const { limit, offset, orderBy } = params;
  const albums = await findAlbums();
  return orderArrayByField(albums.slice(offset, offset + limit), orderBy);
};
