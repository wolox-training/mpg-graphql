const { findAlbumById, findPhotosByAlbumId, findAlbums, buyAlbum } = require('../../services/albums'),
  { orderArrayByField } = require('../../utils/arrays'),
  logger = require('../../logger');

exports.getAlbum = (parent, params) => findAlbumById(params.id);
exports.getPhotos = parent => findPhotosByAlbumId(parent.id);
exports.albumsList = async (parent, params) => {
  const { limit, offset, orderBy } = params;
  const albums = await findAlbums();
  return orderArrayByField(albums.slice(offset, offset + limit), orderBy);
};
exports.buyAlbumById = (parent, params, context) => {
  const { albumId } = params;
  const { id: userId } = context.session;
  return buyAlbum(userId, albumId)
    .then(purchasedAlbum => {
      logger.info(`The album ${purchasedAlbum.title} was purchased successfully`);
      return purchasedAlbum;
    })
    .catch(e => {
      logger.error(`Error purchasing album with id: ${albumId}`);
      throw e;
    });
};
