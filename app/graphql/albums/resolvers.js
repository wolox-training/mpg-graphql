const { findAlbumById, findPhotosByAlbumId, findAlbums } = require('../../services/albums'),
  { orderArrayByField } = require('../../utils/arrays');

const DEFAULT_LIMIT = 3,
  DEFAULT_OFFSET = 0,
  DEFAULT_ORDER_BY = 'id';

exports.getAlbum = (parent, params) => findAlbumById(params.id);
exports.getPhotos = parent => findPhotosByAlbumId(parent.id);
exports.albumsList = async (parent, params) => {
  const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET, orderBy = DEFAULT_ORDER_BY } = params;
  const albums = await findAlbums();
  return orderArrayByField(albums.slice(offset, offset + limit), orderBy);
};
