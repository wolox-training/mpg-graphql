const { albums_api_url } = require('../../config').common.external_apis,
  request = require('request-promise'),
  errors = require('../errors'),
  logger = require('../logger');

exports.findAlbums = () => {
  const options = {
    method: 'GET',
    uri: albums_api_url.albums,
    json: true
  };
  logger.info(`Consuming an external api with url: ${options.uri}/albums`);
  return request(options).catch(err => {
    logger.error(err.message);
    throw errors.externalApiError('Error consuming external API');
  });
};

exports.findPhotosByAlbumId = albumId => {
  const options = {
    method: 'GET',
    uri: albums_api_url.photos,
    qs: { albumId },
    json: true
  };
  logger.info(`Consuming an external api with url: ${options.uri}?albumId=${albumId}`);
  return request(options).catch(err => {
    logger.error(err.message);
    throw errors.externalApiError('Error consuming external API');
  });
};

exports.findAlbumById = id => {
  const options = {
    method: 'GET',
    uri: `${albums_api_url.albums}/${id}`,
    json: true
  };
  logger.info(`Consuming an external api with url: ${options.uri}`);
  return request(options).catch(err => {
    logger.error(err.message);
    throw errors.externalApiError('Error consuming external API');
  });
};
