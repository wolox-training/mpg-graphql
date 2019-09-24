const { mockAlbumDataResponse, mockAlbumsListDataResponse } = require('../mockData/albums'),
  { mockPhotosDataResponse } = require('../mockData/photos'),
  errors = require('../../app/errors');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const endpoints = {
  albums: params => {
    const albumId = params.uri.split('?')[0].split('/')[2];
    if (parseInt(albumId) > 0) {
      return Promise.resolve(mockAlbumDataResponse);
    }
    if (!albumId) {
      return Promise.resolve(mockAlbumsListDataResponse);
    }
    return Promise.reject(errors.externalApiError('Error consuming external API'));
  },
  photos: params => {
    if (parseInt(params.qs.albumId) > 0) {
      return Promise.resolve(mockPhotosDataResponse);
    }
    return Promise.reject(errors.externalApiError('Error consuming external API'));
  }
};

module.exports = jest.fn(requestParams => {
  const endpoint = requestParams.uri.split('?')[0].split('/')[1];
  return delay(100).then(() => endpoints[endpoint](requestParams));
});
