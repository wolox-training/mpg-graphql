const { albums_api_url } = require('../../config').common.external_apis,
  request = require('request-promise'),
  errors = require('../errors'),
  logger = require('../logger'),
  { album } = require('../models');

const findAlbumById = id => {
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

exports.findAlbums = () => {
  const options = {
    method: 'GET',
    uri: albums_api_url.albums,
    json: true
  };
  logger.info(`Consuming an external api with url: ${options.uri}`);
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

exports.findAlbumById = findAlbumById;

exports.buyAlbum = (userId, albumId) =>
  album
    .findOneAlbum({ albumId, userId })
    .then(albumFound => {
      if (albumFound) {
        logger.error(`The album ${albumFound.title} was already purchased by the user: ${userId}`);
        throw errors.albumBuyError('The album was already purchased by the user');
      }
      return findAlbumById(albumId);
    })
    .then(albumFound => {
      const albumToCreate = { albumId: albumFound.id, title: albumFound.title, userId };
      return album.createAlbum(albumToCreate);
    });
