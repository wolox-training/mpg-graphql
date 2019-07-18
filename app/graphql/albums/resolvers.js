const { findAlbumById, findPhotosByAlbumId, findAlbums } = require('../../services/albums'),
  { orderArrayByField, filterArrayByField } = require('../../utils/arrays');

const DEFAULT_LIMIT = 3,
  DEFAULT_OFFSET = 0,
  DEFAULT_ORDER_BY = 'id';

exports.getAlbum = (parent, params) => findAlbumById(params.id);
exports.getPhotos = parent => findPhotosByAlbumId(parent.id);
exports.albumsList = async (parent, params) => {
  const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET, orderBy = DEFAULT_ORDER_BY, filter } = params;
  let albums = await findAlbums();
  if (filter) {
    albums = filterArrayByField(albums, 'title', filter);
  }
  return orderArrayByField(albums.slice(offset, offset + limit), orderBy);
};
