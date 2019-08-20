const { mockAlbumDataResponse, mockAlbumsListDataResponse } = require('../mockData/albums'),
  { mockPhotosDataResponse } = require('../mockData/photos'),
  errors = require('../../app/errors');

module.exports = jest.fn(requestParams => {
  const a = requestParams.uri.split('?');
  const b = a[0].split('/');
  const baseUrl = b[1];
  let idAlbum = 0;
  switch (baseUrl) {
    case 'albums':
      idAlbum = b[2];
      if (parseInt(idAlbum) > 0) {
        return Promise.resolve(mockAlbumDataResponse);
      }
      if (!idAlbum) {
        return Promise.resolve(mockAlbumsListDataResponse);
      }
      break;
    case 'photos':
      idAlbum = requestParams.qs.albumId;
      if (parseInt(idAlbum) > 0) {
        return Promise.resolve(mockPhotosDataResponse);
      }
      break;
    default:
  }
  return Promise.reject(errors.externalApiError('Error consuming external API'));
});
